-- Living4Fans Shop — Schema, RLS, Storage, Seed
-- Wird über die Supabase-MCP als Migration eingespielt.

-- ——— Tabellen ———

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  kategorie text not null default 'sideboards',
  kategorie_label text not null default 'Sideboard',
  teaser text default '',
  beschreibung text default '',
  masse text default '',
  details jsonb default '[]'::jsonb,
  render jsonb,
  preis_cents integer,
  groesse text not null default 'mittel' check (groesse in ('klein','mittel','gross')),
  versandkosten_cents integer,
  farbwahl boolean not null default true,
  status text not null default 'entwurf' check (status in ('aktiv','entwurf','verkauft')),
  sort integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  typ text not null default 'anfrage' check (typ in ('anfrage','angebot','lieferung','kontakt')),
  name text not null,
  email text not null,
  telefon text,
  plz text,
  wunschfarbe text,
  nachricht text,
  status text not null default 'neu' check (status in ('neu','in_bearbeitung','erledigt')),
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  stripe_session_id text unique not null,
  betrag_cents integer not null,
  versand_cents integer not null default 0,
  wunschfarbe text,
  kunde jsonb,
  status text not null default 'bezahlt' check (status in ('bezahlt','in_produktion','versendet','abgeschlossen','storniert')),
  created_at timestamptz not null default now()
);

create table if not exists settings (
  key text primary key,
  value jsonb not null
);

create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end
$$ language plpgsql;

drop trigger if exists products_updated on products;
create trigger products_updated before update on products
  for each row execute function set_updated_at();

-- ——— Row Level Security ———
-- Öffentlich: nur aktive Produkte + deren Bilder lesbar, Einstellungen lesbar,
-- Anfragen einfügbar. Alles andere ausschließlich über Service-Role (Admin-API).

alter table products enable row level security;
drop policy if exists "public read aktiv" on products;
create policy "public read aktiv" on products for select using (status = 'aktiv');

alter table product_images enable row level security;
drop policy if exists "public read images" on product_images;
create policy "public read images" on product_images for select
  using (exists (select 1 from products p where p.id = product_id and p.status = 'aktiv'));

alter table inquiries enable row level security;
drop policy if exists "public insert inquiries" on inquiries;
create policy "public insert inquiries" on inquiries for insert with check (
  typ in ('anfrage','angebot','lieferung','kontakt')
  and char_length(name) between 1 and 200
  and char_length(email) between 3 and 320
  and position('@' in email) > 1
  and char_length(coalesce(nachricht, '')) < 5000
);

alter table orders enable row level security;
alter table settings enable row level security;
drop policy if exists "public read settings" on settings;
create policy "public read settings" on settings for select using (true);

-- ——— Storage-Bucket für Produktfotos ———

insert into storage.buckets (id, name, public)
values ('produkte', 'produkte', true)
on conflict (id) do nothing;

drop policy if exists "public read produkte" on storage.objects;
create policy "public read produkte" on storage.objects for select
  using (bucket_id = 'produkte');

-- ——— Einstellungen (Logistik-Matrix aus dem Konzeptpapier) ———

insert into settings (key, value) values
  ('paketversand_cents', '4900'),
  ('lieferpauschale_cents', '14900'),
  ('radius_km', '100'),
  ('gross_schwelle_cents', '250000'),
  ('plz_zentrum', '"49439"')
on conflict (key) do nothing;

-- ——— Seed 1: die 8 Showcase-Produkte der Website (mit SVG-Render-Konfiguration) ———

insert into products (slug, name, kategorie, kategorie_label, teaser, beschreibung, masse, details, render, preis_cents, groesse, status, sort) values
('haller-sideboard-m', 'Haller Sideboard M', 'sideboards', 'Sideboard',
 $$Der Klassiker fürs Wohnzimmer: drei offene Fächer, drei Klapptüren, endlos viel Ruhe.$$,
 $$Das dreireihige Sideboard ist die vielleicht bekannteste Konfiguration des USM Haller Systems. Unsere aufbereiteten Exemplare stammen aus Büroauflösungen und Privathaushalten, werden vollständig zerlegt, gereinigt und mit neuen Kugeln, Rohren und Nivellierfüßen wieder aufgebaut. Alle Tablare und Klapptüren werden neu pulverbeschichtet — in einer klassischen USM-Farbe oder Ihrer RAL-Wunschfarbe.$$,
 'B 2273 × H 740 × T 373 mm',
 '["Vollständig zerlegt, gereinigt und neu montiert","Neubeschichtung aller Flächen in Wunschfarbe","Chromrohre und Kugeln poliert oder erneuert","Neue Kunststoffgleiter und Nivellierfüße","3 Klapptüren mit neuen Dämpfern"]',
 '{"signature":"Enzian","ort":"Orangerie","image":"/media/tile-enzian.jpg","grid":[["open","open","open"],["flap","flap","flap"]],"cellW":150,"cellH":74,"defaultColor":"enzianblau","wall":"light"}',
 249000, 'mittel', 'aktiv', 10),
('haller-lowboard-tv', 'Haller Lowboard', 'lowboards', 'Lowboard',
 $$Drei Elemente flach über dem Boden — die souveränste Bühne für jedes Wohnzimmer.$$,
 $$Das langgestreckte Lowboard trägt Fernseher, Verstärker und Plattenspieler, ohne sich in den Vordergrund zu spielen. Ein offenes Fach für Geräte mit Fernbedienung, zwei Klapptüren für alles andere. Wie jedes unserer Möbelstücke wird es komplett demontiert, aufbereitet und in Ihrer Wunschfarbe neu pulverbeschichtet.$$,
 'B 2273 × H 740 × T 373 mm',
 '["Kabeldurchlässe auf Wunsch werkzeuglos nachrüstbar","Offenes Gerätefach, IR-durchlässig","Neubeschichtung aller Flächen in Wunschfarbe","Neue Kunststoffgleiter und Nivellierfüße","Belastbarkeit ca. 50 kg pro Element"]',
 '{"signature":"Tanne","ort":"Galerie","image":"/media/tile-tanne.jpg","grid":[["flap","flap","flap"],["open","open","open"]],"cellW":150,"cellH":74,"defaultColor":"usmgruen","wall":"mid"}',
 219000, 'mittel', 'aktiv', 20),
('haller-highboard-l', 'Haller Highboard L', 'highboards', 'Highboard',
 $$Stauraum in der Vertikalen: zehn Fächer auf fünf Ebenen, ein offenes Schaufach.$$,
 $$Das Highboard kombiniert offene Präsentationsfächer mit geschlossenen Ebenen — als Geschirrschrank, Barmöbel oder Aktenschrank gleichermaßen zuhause. Die Auszugstüren der untersten Reihe laufen nach der Aufbereitung wieder wie am ersten Tag.$$,
 'B 1523 × H 1829 × T 373 mm',
 '["10 Fächer auf 5 Ebenen","Neubeschichtung aller Flächen in Wunschfarbe","Alle Scharniere und Dämpfer erneuert","Chromrohre und Kugeln poliert oder erneuert","Auf Wunsch mit Inneneinteilung"]',
 '{"signature":"Rubin","ort":"Fabriketage","image":"/media/tile-rubin.jpg","grid":[["flap","flap"],["flap","open"],["flap","flap"],["flap","flap"],["door","door"]],"cellW":150,"cellH":80,"defaultColor":"rubinrot","wall":"light"}',
 349000, 'gross', 'aktiv', 30),
('haller-rollcontainer', 'Haller Rollcontainer', 'container', 'Container',
 $$Der treueste Mitarbeiter im Homeoffice — auf Rollen, mit drei Auszügen.$$,
 $$Der klassische Rollcontainer passt unter jeden Schreibtisch und macht auch freistehend eine gute Figur. Zwei flache Auszüge für Stifte und Papier, ein doppelt hoher für Hängeregister. Läuft nach der Aufbereitung auf neuen Doppelrollen.$$,
 'B 523 × H 692 × T 523 mm',
 '["3 Auszüge auf Vollauszugsschienen","Neue lastabhängig gebremste Doppelrollen","Neubeschichtung aller Flächen in Wunschfarbe","Auszugssperre gegen Kippen","Auf Wunsch mit Hängeregisterrahmen"]',
 '{"signature":"Gold","ort":"Atelier","image":"/media/tile-gold.jpg","grid":[["drawer"],["drawer"],["drawers"]],"cellW":150,"cellH":74,"defaultColor":"goldgelb","wall":"mid"}',
 99000, 'klein', 'aktiv', 40),
('haller-regal-atelier', 'Haller Regal Atelier', 'regale', 'Regal',
 $$Sechs offene Fächer für Bücher, Vasen und alles, was gesehen werden will.$$,
 $$Das offene Regal ist die leichteste Konfiguration des Systems: keine Türen, keine Klappen, nur Struktur. Es lebt vom Rhythmus der verchromten Rohre und der Tiefe seiner Fächer — und davon, was Sie hineinstellen.$$,
 'B 1523 × H 1110 × T 373 mm',
 '["6 offene Fächer","Neubeschichtung aller Flächen in Wunschfarbe","Chromrohre und Kugeln poliert oder erneuert","Zusätzliche Tablare nachrüstbar","Auch als Raumteiler mit Rückwänden erhältlich"]',
 '{"signature":"Kreide","ort":"Altbau","image":"/media/tile-kreide.jpg","grid":[["open","open"],["open","open"],["open","open"]],"cellW":150,"cellH":82,"defaultColor":"reinweiss","wall":"warm"}',
 179000, 'mittel', 'aktiv', 50),
('haller-beistelltisch', 'Haller Beistelltisch', 'tische', 'Beistelltisch',
 $$Ein einzelnes Element, unendlich einsetzbar — als Nachttisch, Telefontisch, Podest.$$,
 $$Die kleinste Einheit des Systems: ein einzelnes offenes Element auf Nivellierfüßen. Neben dem Sofa, am Bett oder im Flur — der Beistelltisch ist der einfachste Weg, mit USM Haller anzufangen. Und in der Wunschfarbe der präziseste.$$,
 'B 523 × H 568 × T 418 mm',
 '["1 offenes Fach","Neubeschichtung aller Flächen in Wunschfarbe","Chromrohre und Kugeln poliert oder erneuert","Neue Nivellierfüße","Auf Wunsch mit Rollen statt Füßen"]',
 '{"signature":"Sand","ort":"Wintergarten","image":"/media/tile-sand.jpg","grid":[["open"]],"cellW":150,"cellH":110,"defaultColor":"beige","wall":"light"}',
 49000, 'klein', 'aktiv', 60),
('haller-sideboard-xl', 'Haller Sideboard XL', 'sideboards', 'Sideboard',
 $$Vier Elemente Wandlänge: das Statement-Sideboard für große Räume.$$,
 $$Acht Fächer über drei Meter — für Esszimmer, Empfänge und Konferenzräume, die eine ruhige, präzise Linie brauchen. Die Kombination aus offenen Fächern, Klappen und Türen konfigurieren wir gemeinsam mit Ihnen; jede Anordnung ist möglich.$$,
 'B 3023 × H 740 × T 373 mm',
 '["8 Fächer, Konfiguration nach Wunsch","Neubeschichtung aller Flächen in Wunschfarbe","Chromrohre und Kugeln poliert oder erneuert","Lieferung und Aufbau durch unser Team","Auf Wunsch mit Kabelmanagement"]',
 '{"signature":"Graphit","ort":"Loft","image":"/media/tile-graphit.jpg","grid":[["flap","open","open","flap"],["door","door","door","door"]],"cellW":140,"cellH":72,"defaultColor":"graphitschwarz","wall":"mid"}',
 329000, 'gross', 'aktiv', 70),
('haller-highboard-vitrine', 'Haller Highboard S', 'highboards', 'Highboard',
 $$Die schmale Säule: drei Ebenen Stauraum auf kleinstem Grundriss.$$,
 $$Ein Element breit, drei Ebenen hoch: Das schmale Highboard findet in Nischen, Fluren und kleinen Wohnungen Platz, wo größere Konfigurationen scheitern. Oben offen, in der Mitte eine Klappe, unten eine Tür.$$,
 'B 773 × H 1110 × T 373 mm',
 '["3 Fächer auf 3 Ebenen","Neubeschichtung aller Flächen in Wunschfarbe","Alle Scharniere und Dämpfer erneuert","Neue Nivellierfüße","Ideal für Nischen ab 80 cm Breite"]',
 '{"signature":"Stahl","ort":"Maschinenhalle","image":"/media/tile-stahl.jpg","grid":[["open"],["flap"],["door"]],"cellW":150,"cellH":96,"defaultColor":"stahlblau","wall":"warm"}',
 159000, 'mittel', 'aktiv', 80)
on conflict (slug) do nothing;

-- ——— Seed 2: die 25 Kleinanzeigen-Artikel (Status: Entwurf — Fotos & Freigabe über das Admin-Dashboard) ———

insert into products (slug, name, kategorie, kategorie_label, teaser, beschreibung, masse, preis_cents, groesse, status, sort) values
('couchtisch-2in1-glas', 'Couchtisch 2 in 1, Glas', 'tische', 'Couchtisch',
 $$Zwei Elemente, unendlich flexibel: das kleinere gleitet nahtlos unter das größere.$$,
 $$Einmalig schöner 2-in-1-Couchtisch aus dem USM Haller Universum, Glas oder alle Farben. Der Tisch besteht aus zwei einzelnen Elementen — das spart Platz, der sich jederzeit wieder in erweiterte Abstellfläche verwandeln lässt. Tischplatten in jeder USM-Farbe oder Glas möglich.

Der Preis bezieht sich auf die abgebildete Basisvariante und enthält die Mehrwertsteuer — mit Rechnung. Weitere Ausstattungen (Rollen, andere Maße, alle Farben, beide Platten in Glas) beeinflussen den Preis — fragen Sie einfach an.

Alle unsere Möbelstücke sind preloved, fachgerecht aufgearbeitet und neu pulverbeschichtet. Ihr Stück wird nach Bestellung und Zahlung individuell angefertigt; das kann mehrere Wochen dauern, da Aufträge in ihrer Reihenfolge bearbeitet werden.$$,
 'Großes Element 75 × 50 × 30 cm, kleines Element 50 × 35 × 23 cm (B×T×H)',
 65500, 'klein', 'entwurf', 110),
('sideboard-755', 'Sideboard', 'sideboards', 'Sideboard', $$Stilvolles Board in allen Farben und Varianten aus dem USM Haller Universum.$$, $$Stilvolles Sideboard in allen Farben und Varianten. Der Preis bezieht sich auf die Basisvariante inkl. MwSt. mit Rechnung; jede weitere Konfiguration (Maße, Klappen, Türen, Farben) auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 75500, 'mittel', 'entwurf', 120),
('beistelltisch-c-form', 'Couchtisch / Beistelltisch C-Form', 'tische', 'Beistelltisch', $$Genial flexibler Beistelltisch in C-Form — schiebt sich über Sofakante und Bettrand.$$, $$Ein (oder mehrere) genial flexible USM Haller Beistelltische in C-Form. Preis für die Basisvariante inkl. MwSt. mit Rechnung; alle Farben und Varianten auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 50000, 'klein', 'entwurf', 130),
('highboard-1450', 'Highboard', 'highboards', 'Highboard', $$Stilvolles Highboard nach individueller Vorstellung — alle Farben, alle Varianten.$$, $$Stilvolles Highboard von USM Haller in allen Farben nach individueller Vorstellung. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration nach Wunsch auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 145000, 'mittel', 'entwurf', 140),
('konsole-flur', 'Konsole / Flurschrank', 'flur', 'Konsole', $$Die Visitenkarte Ihrer Wohnung: Konsole für schmale Flure und Nischen.$$, $$Konsole / kleiner Flurschrank / Regal von USM Haller in allen Farben und Varianten. Oben ein Fach mit geschlossenen Seitenwänden, darunter ein Gestell. Preis für die Basisvariante inkl. MwSt. mit Rechnung. Weitere Konfigurationen (Rückwand, mehr Etagen, Tablare, andere Maße, Rollen, Klappe/Auszug, Glastablare) auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet.$$, '77 × 79 × 27 cm (B×H×T) mit Füßen', 47500, 'klein', 'entwurf', 150),
('individuelle-konfiguration', 'Möbelstück nach individueller Konfiguration', 'individuell', 'Individuell', $$Sideboard, Regal, Tisch, Garderobe — wir bauen Ihr USM Haller Möbelstück nach Maß.$$, $$Sie suchen ein ganz besonderes USM Haller Möbelstück? Ein Sideboard, Regal, Tisch oder eine Garderobe? Wir konfigurieren Ihr Stück gemeinsam — Größe, Aufteilung, Ausstattung und Farbe ganz nach Ihren Wünschen. Preis je nach Konfiguration; Anfertigung nach Freigabe und Zahlung.$$, '', null, 'gross', 'entwurf', 160),
('kuecheninsel', 'Kücheninsel', 'kuechen', 'Kücheninsel', $$Die elegante Kücheninsel — ein Statement aus dem USM Haller System.$$, $$Stilvolle USM Haller Kücheninsel in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration und Arbeitsplatte auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung. Lieferung und Aufbau vor Ort stimmen wir persönlich ab.$$, '', 350000, 'gross', 'entwurf', 170),
('kaffee-bar', '(Kaffee-)Bar', 'servierwagen', 'Barwagen', $$Barwagen und Kaffeestation in einem — auf Rollen, in allen Farben.$$, $$Stilvoller Barwagen / Servierwagen von USM Haller in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; weitere Ausstattung auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 95500, 'klein', 'entwurf', 180),
('waschbeckenunterschrank', 'Waschbeckenunterschrank', 'kuechen', 'Badmöbel', $$Das Highboard als Waschbeckenunterschrank — individuell für Ihr Bad.$$, $$Stilvolles USM Haller Highboard als Waschbeckenunterschrank in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Ausschnitt und Maße nach Ihrem Waschbecken auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet.$$, '', 120000, 'mittel', 'entwurf', 190),
('servierwagen-625', 'Servierwagen', 'servierwagen', 'Servierwagen', $$Der Klassiker auf Rollen — individualisierbar in allen Farben.$$, $$Stilvoller Bar-/Servierwagen von USM Haller in allen Farben und nach individuellen Wünschen. Preis für die Basisvariante inkl. MwSt. mit Rechnung. Preloved, aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 62500, 'klein', 'entwurf', 200),
('sideboard-1450', 'Sideboard', 'sideboards', 'Sideboard', $$Elegantes Sideboard/Highboard — alle Farben und Varianten, wie neu.$$, $$Stilvolles Sideboard/Highboard von USM Haller in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 145000, 'mittel', 'entwurf', 210),
('nachttische', 'Nachttisch(e)', 'nachttische', 'Nachttisch', $$Elegante Nachtschränke — einzeln oder im Paar, in allen Farben.$$, $$Stilvolle Nachtschränke von USM Haller in allen Farben und Varianten. Preis pro Stück für die Basisvariante inkl. MwSt. mit Rechnung; Varianten auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung. Versand fertig montiert per Paket.$$, '', 64500, 'klein', 'entwurf', 220),
('servierwagen-720', 'Servierwagen', 'servierwagen', 'Servierwagen', $$Barwagen nach Wunsch — individualisierbar in allen Farben.$$, $$Stilvoller Barwagen / Servierwagen von USM Haller in allen Farben und nach individuellen Wünschen. Preis für die Basisvariante inkl. MwSt. mit Rechnung. Preloved, aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 72000, 'klein', 'entwurf', 230),
('sideboard-1250', 'Sideboard', 'sideboards', 'Sideboard', $$Das elegante Highboard — alle Farben, wie neu, individualisierbar.$$, $$Stilvolles Highboard von USM Haller in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 125000, 'mittel', 'entwurf', 240),
('schuhschrank', 'Schuhschrank mit Zwischenböden', 'flur', 'Schuhschrank', $$Das Sideboard als Schuhschrank — mit Zwischenböden, in allen Farben.$$, $$Stilvolles Sideboard/Highboard von USM Haller, speziell als Schuhschrank mit Zwischenböden konfiguriert. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Maße und Aufteilung auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet.$$, '', 240000, 'mittel', 'entwurf', 250),
('sideboard-3950', 'Sideboard', 'sideboards', 'Sideboard', $$Das große Statement-Sideboard — alle Farben, wie neu, individualisierbar.$$, $$Stilvolles Sideboard/Highboard von USM Haller in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Lieferung und Aufbau stimmen wir persönlich ab.$$, '', 395000, 'gross', 'entwurf', 260),
('sideboard-2400', 'Sideboard', 'sideboards', 'Sideboard', $$Zeitloses Board — alle Farben, individualisierbar, wie neu.$$, $$Stilvolles Board von USM Haller in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 240000, 'mittel', 'entwurf', 270),
('sideboard-2600', 'Sideboard', 'sideboards', 'Sideboard', $$Neuwertiges Sideboard/Highboard — alle Farben, individualisierbar.$$, $$Stilvolles Sideboard/Highboard von USM Haller in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Lieferung und Aufbau stimmen wir persönlich ab.$$, '', 260000, 'gross', 'entwurf', 280),
('spiegel-unikat', 'Spiegel aus USM Haller Teilen', 'accessoires', 'Spiegel', $$Ein Unikat: Spiegel aus USM Haller Teilen, in allen Größen und Farben.$$, $$Stilvoller, individueller Spiegel aus USM Haller-Teilen in allen Farben und Größen. Jedes Stück ein Unikat — Preis je nach Größe und Ausführung auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet.$$, '', null, 'klein', 'entwurf', 290),
('sideboard-2200', 'Sideboard', 'sideboards', 'Sideboard', $$Neuwertiges Board — alle Farben, individualisierbar.$$, $$Stilvolles Board von USM Haller in allen Farben und Varianten. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 220000, 'mittel', 'entwurf', 300),
('lowboard-tv-1234', 'Lowboard / TV-Möbel', 'lowboards', 'Lowboard', $$Ihr Lowboard nach individueller Konfiguration — alle Farben.$$, $$Stilvolles Lowboard / TV-Möbel von USM Haller nach Ihrer individuellen Konfiguration in allen Farben. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet — Anfertigung nach Bestellung und Zahlung.$$, '', 123400, 'mittel', 'entwurf', 310),
('couchtisch-glas', 'Couchtisch, Glas', 'tische', 'Couchtisch', $$Der elegante Couchtisch mit Glasplatte — Blickfang mit WOW-Effekt.$$, $$Einmalig schöner, eleganter USM Haller Couchtisch. Egal zu welcher Sofaform und zu welchem Mobiliar: diese Stilikone ist ein absoluter Blickfang. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Platten in Glas oder jeder USM-Farbe auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet.$$, '', 95000, 'klein', 'entwurf', 320),
('wanduhr', 'Wanduhr, lautlos', 'accessoires', 'Wanduhr', $$Die lautlose Wanduhr aus USM Haller Teilen — in allen Farben.$$, $$Stilvolle, lautlose Wanduhr aus USM Haller Teilen. Elegant, zeitlos, mit klaren Linien — in allen Farben. Preis inkl. MwSt. mit Rechnung. Versand fertig montiert per Paket.$$, '', 23000, 'klein', 'entwurf', 330),
('c-beistelltisch', 'C-Beistelltisch, Glas', 'tische', 'Beistelltisch', $$Der flexible C-Tisch mit Glasplatte — neuwertig, in allen Farben.$$, $$Ein (oder mehrere) genial flexible USM Haller Beistelltische in C-Form mit Glasplatte. Preis für die Basisvariante inkl. MwSt. mit Rechnung; alle Farben auf Anfrage. Preloved, aufgearbeitet, neu pulverbeschichtet.$$, '', 26500, 'klein', 'entwurf', 340),
('highboard-regal-4400', 'Highboard-Regal', 'highboards', 'Highboard', $$Das große Regal-Highboard nach individuellen Wünschen — alle Farben.$$, $$Stilvolles Regal/Highboard von USM Haller in allen Farben und nach individuellen Wünschen. Preis für die Basisvariante inkl. MwSt. mit Rechnung; Konfiguration auf Anfrage. Preloved, professionell aufgearbeitet, neu pulverbeschichtet — Lieferung und Aufbau stimmen wir persönlich ab.$$, '', 440000, 'gross', 'entwurf', 350)
on conflict (slug) do nothing;

-- ——— Migration 2: Vorkasse, Bestellnummern, Zahlungs- & Mail-Einstellungen (30.08., bereits eingespielt) ———

alter table orders alter column stripe_session_id drop not null;
alter table orders drop constraint if exists orders_status_check;
alter table orders add constraint orders_status_check
  check (status in ('offen','bezahlt','in_produktion','versendet','abgeschlossen','storniert'));
alter table orders add column if not exists zahlungsart text not null default 'stripe'
  check (zahlungsart in ('stripe','vorkasse'));
create sequence if not exists bestellnr_seq start 1001;
alter table orders add column if not exists bestellnr text unique
  default ('L4F-' || nextval('bestellnr_seq'));

insert into settings (key, value) values
  ('zahlung_stripe', 'true'),
  ('zahlung_vorkasse', 'true'),
  ('zahlung_paypal', 'true'),
  ('bank_kontoinhaber', '"Alesja Schonhöft"'),
  ('bank_iban', '"DE41 1001 1001 2621 0848 67"'),
  ('paypal_empfaenger', '"living4fans@web.de"'),
  ('mail_empfaenger', '"living4fans@web.de"'),
  ('mail_bei_bestellung', 'true'),
  ('mail_bei_anfrage', 'true')
on conflict (key) do nothing;

-- ——— Migration 3: „Nur auf Anfrage"-Schalter (04.09., bereits eingespielt) ———
alter table products add column if not exists nur_anfrage boolean not null default false;
