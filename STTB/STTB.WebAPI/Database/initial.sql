CREATE DATABASE sttb_db;

CREATE TABLE news (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    excerpt NVARCHAR(MAX),
    content NVARCHAR(MAX),
    image VARCHAR(255),
    category VARCHAR(50)
        CHECK (category IN ('Institusi','Akademik','Kegiatan','Rohani')),
    author VARCHAR(100),
    published_at DATE,
    status VARCHAR(20)
        CHECK (status IN ('draft','published')),
    views INT DEFAULT 0,
    tags NVARCHAR(MAX), -- bisa simpan JSON atau comma separated
    created_at DATETIME DEFAULT GETDATE()
);


CREATE TABLE events (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE,
    description NVARCHAR(MAX),
    content NVARCHAR(MAX),
    image VARCHAR(255),
    start_date DATE,
    end_date DATE,
    time VARCHAR(50),
    location VARCHAR(150),
    speakers NVARCHAR(MAX), -- bisa simpan JSON
    agenda NVARCHAR(MAX), -- JSON
    price VARCHAR(50),
    is_featured BIT DEFAULT 0,
    status VARCHAR(20)
        CHECK (status IN ('upcoming','ongoing','completed')),
    max_participants INT,
    registration_deadline DATE,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE event_registrations (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    event_id UNIQUEIDENTIFIER,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(50),
    church VARCHAR(150),
    notes NVARCHAR(MAX),
    registered_at DATETIME DEFAULT GETDATE(),
    payment_status VARCHAR(20)
        CHECK (payment_status IN ('pending','paid','cancelled')),

    CONSTRAINT fk_event
        FOREIGN KEY (event_id)
        REFERENCES events(id)
        ON DELETE CASCADE
);

CREATE TABLE testimonials (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name VARCHAR(100),
    degree VARCHAR(50),
    photo VARCHAR(255),
    quote NVARCHAR(MAX),
    position VARCHAR(150),
    is_featured BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE programs (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title VARCHAR(100),
    degree VARCHAR(50),
    duration VARCHAR(50),
    description NVARCHAR(MAX),
    created_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE contact_messages (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(50),
    subject VARCHAR(200),
    message NVARCHAR(MAX),
    submitted_at DATETIME DEFAULT GETDATE(),
    status VARCHAR(20)
        CHECK (status IN ('new','read','replied'))
        DEFAULT 'new'
);

-- isi data
--news
INSERT INTO news (title, slug, excerpt, content, category, author, published_at, status)
VALUES
('STTB Membuka Program Studi Baru',
'sttb-membuka-program-studi-baru',
'STTB resmi membuka program studi baru.',
'STTB mengumumkan pembukaan program studi baru guna menjawab kebutuhan pelayanan gereja masa kini.',
'Institusi',
'Admin',
'2025-01-10',
'published'),

('Seminar Teologi Nasional 2025',
'seminar-teologi-nasional-2025',
'Seminar nasional teologi akan diadakan di STTB.',
'Seminar ini menghadirkan berbagai pembicara dari kalangan teolog dan pemimpin gereja.',
'Kegiatan',
'Admin',
'2025-01-15',
'published'),

('Mahasiswa STTB Mengadakan Bakti Sosial',
'mahasiswa-sttb-bakti-sosial',
'Mahasiswa STTB melakukan kegiatan bakti sosial.',
'Kegiatan ini meliputi pembagian sembako dan pelayanan doa bagi masyarakat sekitar.',
'Kegiatan',
'Admin',
'2025-02-02',
'published'),

('Kuliah Umum Bersama Pendeta Tamu',
'kuliah-umum-pendeta-tamu',
'Kuliah umum menghadirkan pembicara dari luar negeri.',
'Mahasiswa mendapatkan wawasan baru mengenai perkembangan pelayanan gereja global.',
'Akademik',
'Dosen',
'2025-02-12',
'published'),

('Retret Rohani Mahasiswa STTB',
'retret-rohani-mahasiswa-sttb',
'Mahasiswa mengikuti retret rohani tahunan.',
'Retret ini bertujuan memperdalam kehidupan spiritual mahasiswa.',
'Rohani',
'Admin',
'2025-02-20',
'published'),

('Pelantikan Ketua Senat Mahasiswa',
'pelantikan-ketua-senat-mahasiswa',
'Pelantikan ketua senat mahasiswa periode baru.',
'Acara pelantikan dihadiri oleh pimpinan kampus dan seluruh mahasiswa.',
'Institusi',
'Admin',
'2025-03-01',
'published'),

('Workshop Penulisan Teologi',
'workshop-penulisan-teologi',
'Workshop untuk meningkatkan kemampuan menulis teologi.',
'Mahasiswa dilatih menulis karya ilmiah yang dapat dipublikasikan.',
'Akademik',
'Dosen',
'2025-03-05',
'published'),

('Perayaan Natal STTB',
'perayaan-natal-sttb',
'STTB merayakan Natal bersama.',
'Perayaan Natal diisi dengan ibadah, pujian, dan drama Natal.',
'Rohani',
'Admin',
'2024-12-25',
'published'),

('STTB Menjalin Kerjasama dengan Gereja Lokal',
'kerjasama-sttb-gereja-lokal',
'Kerjasama pelayanan dengan beberapa gereja.',
'Kerjasama ini membuka kesempatan pelayanan bagi mahasiswa.',
'Institusi',
'Admin',
'2025-03-10',
'published'),

('Kegiatan Doa Pagi Mahasiswa',
'doa-pagi-mahasiswa',
'Mahasiswa rutin mengadakan doa pagi.',
'Doa pagi menjadi sarana membangun kehidupan rohani mahasiswa.',
'Rohani',
'Admin',
'2025-03-12',
'published'),

('Pelatihan Kepemimpinan Mahasiswa',
'pelatihan-kepemimpinan-mahasiswa',
'Mahasiswa mengikuti pelatihan kepemimpinan.',
'Pelatihan ini bertujuan mempersiapkan mahasiswa menjadi pemimpin pelayanan.',
'Akademik',
'Dosen',
'2025-03-15',
'published'),

('Ibadah Syukur Awal Semester',
'ibadah-syukur-awal-semester',
'STTB mengadakan ibadah syukur.',
'Ibadah ini menjadi pembukaan semester baru bagi seluruh mahasiswa.',
'Rohani',
'Admin',
'2025-01-05',
'published'),

('Kunjungan Pelayanan ke Gereja Mitra',
'kunjungan-pelayanan-gereja-mitra',
'Mahasiswa melakukan kunjungan pelayanan.',
'Kunjungan ini menjadi bagian dari program praktik pelayanan mahasiswa.',
'Kegiatan',
'Admin',
'2025-02-25',
'published'),

('Diskusi Teologi Kontemporer',
'diskusi-teologi-kontemporer',
'Diskusi mengenai isu teologi masa kini.',
'Mahasiswa dan dosen berdiskusi mengenai tantangan teologi modern.',
'Akademik',
'Dosen',
'2025-03-18',
'published'),

('Pengabdian Masyarakat Mahasiswa STTB',
'pengabdian-masyarakat-sttb',
'Mahasiswa melakukan kegiatan pengabdian masyarakat.',
'Program ini meliputi pelayanan rohani dan bantuan sosial.',
'Kegiatan',
'Admin',
'2025-03-20',
'published');

--events
INSERT INTO events
(title, slug, description, content, image, start_date, end_date, time, location, speakers, agenda, price, is_featured, status, max_participants, registration_deadline)
VALUES
(
'Seminar Teologi Nasional',
'seminar-teologi-nasional',
'Seminar nasional teologi bersama pembicara internasional.',
'Acara seminar membahas perkembangan teologi di era modern.',
'event1.jpg',
'2026-04-10',
'2026-04-10',
'09:00',
'Aula STTB',
'["Pdt. Samuel","Dr. Lukas"]',
'[{"time":"09:00","topic":"Opening"},{"time":"10:00","topic":"Keynote Session"}]',
'Free',
1,
'upcoming',
200,
'2026-04-05'
),

(
'Workshop Penulisan Teologi',
'workshop-penulisan-teologi',
'Workshop meningkatkan kemampuan menulis teologi.',
'Peserta akan belajar teknik menulis artikel teologi akademik.',
'event2.jpg',
'2026-04-15',
'2026-04-15',
'13:00',
'Ruang Seminar STTB',
'["Dr. Daniel"]',
'[{"time":"13:00","topic":"Introduction"},{"time":"14:00","topic":"Writing Practice"}]',
'Rp50.000',
0,
'upcoming',
100,
'2026-04-10'
),

(
'Retret Rohani Mahasiswa',
'retret-rohani-mahasiswa',
'Retret tahunan mahasiswa STTB.',
'Retret bertujuan memperdalam kehidupan spiritual mahasiswa.',
'event3.jpg',
'2026-05-01',
'2026-05-03',
'08:00',
'Villa Bukit Doa',
'["Pdt. Yohanes"]',
'[{"time":"08:00","topic":"Morning Devotion"},{"time":"19:00","topic":"Night Worship"}]',
'Rp200.000',
1,
'upcoming',
150,
'2026-04-25'
),

(
'Pelatihan Kepemimpinan Mahasiswa',
'pelatihan-kepemimpinan-mahasiswa',
'Pelatihan bagi mahasiswa untuk menjadi pemimpin pelayanan.',
'Materi meliputi kepemimpinan rohani dan manajemen pelayanan.',
'event4.jpg',
'2026-04-20',
'2026-04-20',
'10:00',
'Aula STTB',
'["Dr. Markus"]',
'[{"time":"10:00","topic":"Leadership Basics"}]',
'Free',
0,
'upcoming',
120,
'2026-04-18'
),

(
'Konferensi Gereja dan Misi',
'konferensi-gereja-misi',
'Konferensi tentang misi gereja di dunia modern.',
'Acara menghadirkan pembicara dari berbagai negara.',
'event5.jpg',
'2026-06-01',
'2026-06-03',
'09:00',
'Gedung Konferensi STTB',
'["Dr. Andrew","Pdt. Petrus"]',
'[{"time":"09:00","topic":"Mission Today"},{"time":"11:00","topic":"Church Growth"}]',
'Rp150.000',
1,
'upcoming',
300,
'2026-05-25'
),

(
'Ibadah Kebangunan Rohani',
'ibadah-kebangunan-rohani',
'Ibadah kebangunan rohani terbuka untuk umum.',
'Ibadah diisi dengan pujian dan pemberitaan firman.',
'event6.jpg',
'2025-04-05',
'2025-04-05',
'18:00',
'Kapel STTB',
'["Pdt. David"]',
'[{"time":"18:00","topic":"Praise & Worship"}]',
'Free',
0,
'completed',
500,
'2025-04-04'
),

(
'Diskusi Teologi Kontemporer',
'diskusi-teologi-kontemporer',
'Diskusi tentang isu teologi masa kini.',
'Mahasiswa dan dosen berdiskusi tentang tantangan gereja.',
'event7.jpg',
'2026-05-10',
'2026-05-10',
'15:00',
'Ruang Diskusi STTB',
'["Dr. Lukas"]',
'[{"time":"15:00","topic":"Modern Theology"}]',
'Free',
0,
'upcoming',
80,
'2026-05-05'
),

(
'Kelas Musik Gereja',
'kelas-musik-gereja',
'Pelatihan musik untuk pelayanan gereja.',
'Peserta belajar dasar musik gereja dan worship.',
'event8.jpg',
'2026-04-22',
'2026-04-22',
'14:00',
'Studio Musik STTB',
'["Samuel Music"]',
'[{"time":"14:00","topic":"Basic Worship Music"}]',
'Rp75.000',
0,
'upcoming',
60,
'2026-04-18'
),

(
'Seminar Konseling Pastoral',
'seminar-konseling-pastoral',
'Seminar tentang pelayanan konseling pastoral.',
'Materi tentang pendampingan jemaat.',
'event9.jpg',
'2026-05-20',
'2026-05-20',
'10:00',
'Aula STTB',
'["Dr. Jonathan"]',
'[{"time":"10:00","topic":"Pastoral Counseling"}]',
'Rp100.000',
0,
'upcoming',
150,
'2026-05-15'
),

(
'Perayaan Natal STTB',
'perayaan-natal-sttb',
'Perayaan Natal bersama civitas STTB.',
'Acara diisi ibadah dan drama Natal.',
'event10.jpg',
'2025-12-25',
'2025-12-25',
'19:00',
'Aula STTB',
'["Pdt. Daniel"]',
'[{"time":"19:00","topic":"Christmas Service"}]',
'Free',
1,
'completed',
500,
'2025-12-20'
),

(
'Pelayanan Mahasiswa ke Desa',
'pelayanan-mahasiswa-desa',
'Program pelayanan ke desa mitra.',
'Mahasiswa melayani masyarakat melalui kegiatan sosial.',
'event11.jpg',
'2026-06-10',
'2026-06-12',
'08:00',
'Desa Harapan',
'["Tim Mahasiswa"]',
'[{"time":"08:00","topic":"Community Service"}]',
'Free',
0,
'upcoming',
100,
'2026-06-05'
),

(
'Seminar Apologetika Kristen',
'seminar-apologetika-kristen',
'Seminar membahas pembelaan iman Kristen.',
'Peserta belajar menjawab pertanyaan iman.',
'event12.jpg',
'2026-05-25',
'2026-05-25',
'09:00',
'Aula STTB',
'["Dr. Michael"]',
'[{"time":"09:00","topic":"Defending Faith"}]',
'Rp120.000',
0,
'upcoming',
200,
'2026-05-20'
),

(
'Pelatihan Penginjilan',
'pelatihan-penginjilan',
'Pelatihan strategi penginjilan.',
'Peserta belajar metode penginjilan efektif.',
'event13.jpg',
'2026-06-15',
'2026-06-15',
'10:00',
'Kapel STTB',
'["Pdt. Paulus"]',
'[{"time":"10:00","topic":"Evangelism Strategy"}]',
'Free',
0,
'upcoming',
120,
'2026-06-10'
),

(
'Seminar Kepemimpinan Gereja',
'seminar-kepemimpinan-gereja',
'Seminar kepemimpinan untuk pelayan gereja.',
'Materi tentang kepemimpinan rohani.',
'event14.jpg',
'2026-07-01',
'2026-07-01',
'09:00',
'Gedung Konferensi STTB',
'["Dr. Markus"]',
'[{"time":"09:00","topic":"Church Leadership"}]',
'Rp150.000',
0,
'upcoming',
250,
'2026-06-25'
),

(
'Festival Pelayanan Mahasiswa',
'festival-pelayanan-mahasiswa',
'Festival pelayanan mahasiswa STTB.',
'Mahasiswa menampilkan berbagai pelayanan kreatif.',
'event15.jpg',
'2026-07-10',
'2026-07-10',
'16:00',
'Lapangan STTB',
'["Panitia Mahasiswa"]',
'[{"time":"16:00","topic":"Opening Festival"}]',
'Free',
1,
'upcoming',
400,
'2026-07-05'
);