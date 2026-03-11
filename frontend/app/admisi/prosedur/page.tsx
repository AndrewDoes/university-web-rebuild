'use client'
import React, { useState } from 'react';
import {
    Monitor,
    FileEdit,
    Wallet,
    UserCheck,
    MailCheck,
    ChevronRight,
    ArrowRight,
    CheckCircle2,
    Info,
    Mail,
    Phone,
    Download
} from 'lucide-react';

const categoryLinks = [
    {
        title: "JADWAL",
        href: "/admisi/jadwal",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "FAQ",
        href: "/admisi/faq",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIJYVfVgsn933N0y9r0arRYo5QNJvrHAUcyQ&s"
    },
    {
        title: "PERSYARATAN",
        href: "/admisi/persyaratan",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
    }
];

const steps = [
    {
        id: 1,
        label: "TAHAP 1",
        short: "Memperoleh Formulir Pendaftaran",
        title: "Memperoleh formulir pendaftaran",
        content: (
            <div className="space-y-8">
                <p className="text-muted-foreground italic leading-relaxed">
                    Melakukan pendaftaran awal ke sistem admisi online dengan mengakses alamat <span className="font-bold text-primary">sis.sttb.ac.id/pmb</span>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-border/50 p-6 rounded-sm bg-muted/20">
                    <div className="space-y-4">
                        <p className="text-sm font-medium leading-relaxed">Melakukan pendaftaran awal ke sistem admisi online dengan mengakses alamat <span className="text-primary font-bold">sis.sttb.ac.id/pmb</span>.</p>
                        <p className="text-sm font-medium leading-relaxed">Form pendaftaran juga dapat diminta dengan menghubungi email <span className="text-primary font-bold">admisi@sttb.ac.id</span> atau WhatsApp: <span className="text-primary font-bold">0815 7336 0009</span>.</p>
                    </div>
                    <ul className="space-y-2 text-xs italic text-muted-foreground list-disc pl-4">
                        <li>Setelah mengisi data, maka formulir dapat diunduh di halaman situs berikutnya.</li>
                        <li>Foto yang dilampirkan harus berbentuk format JPEG dan ukuran tidak lebih dari 400 kb.</li>
                        <li>Jangan menggunakan tanda koma atau tanda baca apapun dalam teks yang diketik.</li>
                        <li>Pengiriman form tidak dipungut biaya.</li>
                        <li>Form dapat diperoleh secara hardcopy melalui pos atau secara softcopy melalui whatsapp/email sesuai permintaan pendaftar.</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: 2,
        label: "TAHAP 2",
        short: "Mengirim Form & Berkas",
        title: "Mengisi form dan mempersiapkan berkas lainnya",
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Mengisi 1 set formulir pendaftaran yang terdiri dari:</h4>
                            <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                                <li>Form Pendaftaran</li>
                                <li>Form Kesaksian A (pertobatan pribadi)</li>
                                <li>Form Kesaksian B (panggilan pelayanan)</li>
                                <li>Form Data Kesehatan 1 & 2</li>
                                <li>Form Data Keluarga</li>
                                <li>Form Konfirmasi Dukungan Pembiayaan Studi</li>
                                <li>Form Persetujuan 1 & 2</li>
                                <li>Form Rekomendasi 1 (dari gembala/pembina rohani)</li>
                                <li>Form Rekomendasi 2 (dari teman/rekan kerja)</li>
                                <li>Form Rekomendasi 3 (dari guru, dosen/atasan)</li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Melampirkan dokumen-dokumen tambahan:</h4>
                            <ul className="text-xs space-y-1 text-muted-foreground list-disc pl-4">
                                <li>Fotocopy Akte Kelahiran</li>
                                <li>Fotocopy Kartu Tanda Penduduk (KTP)</li>
                                <li>Pasfoto terbaru berwarna ukuran 4 x 6</li>
                                <li>Fotocopy Surat Kelulusan/Ijazah dan Transkrip</li>
                                <li>Fotocopy Raport terakhir/transkrip yang dilegalisir</li>
                                <li>Fotocopy surat baptis dan surat sidi</li>
                                <li>Fotocopy Kartu BPJS atau Kartu Indonesia Sehat</li>
                                <li>Paper Akademik/Book review bagi pendaftar program studi S2</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="p-6 bg-muted/30 border border-border italic text-[11px] leading-relaxed space-y-4">
                            <p>Bila ingin mengajukan permohonan beasiswa mohon hubungi petugas kami untuk memperoleh form pengajuan beasiswa.</p>
                            <p className="font-bold text-primary uppercase">Form dapat diisi secara digital, tidak perlu dicetak (diprint). Tanda tangan tetap wajib dicantumkan secara digital.</p>
                            <p>Berkas dapat dikirimkan secara <span className="font-bold">hardcopy</span> melalui pos atau secara <span className="font-bold">softcopy</span>. Berkas softcopy dikirim melalui email: <span className="font-bold text-primary">admisi@sttb.ac.id</span> atau WhatsApp: <span className="font-bold text-primary">0815 7336 0009</span>.</p>
                        </div>
                        <div className="space-y-2 border-l-4 border-secondary pl-6">
                            <h4 className="text-xs font-black uppercase text-primary">Kirim Berkas Ke:</h4>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Bagian Admisi - Kantor STT Bandung<br />
                                Jl. Dr. Djunjunan 105<br />
                                Kelurahan Cicendo Kecamatan Andir,<br />
                                Bandung, Jawa Barat 40173
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        label: "TAHAP 3",
        short: "Mendapatkan Formulir Pendaftaran",
        title: "Membayar Biaya Pendaftaran & Tes Masuk",
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border border-border p-8 bg-card shadow-sm">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-primary">
                            <Wallet size={32} />
                            <h4 className="text-2xl font-bold font-serif">Rp 500.000,-</h4>
                        </div>
                        <p className="text-sm leading-relaxed">Membayar biaya formulir pendaftaran sebesar <span className="font-bold">Rp 500.000,-</span> (wajib ditransfer ke rekening <span className="font-bold">BCA an. Yayasan STT Bandung, ac: 282 300 5555</span>).</p>
                        <p className="text-sm leading-relaxed">Mengirimkan <span className="font-bold text-primary underline">bukti transfer</span> melalui link <span className="font-bold">sttb.ac.id/konfirmasi</span> atau via WA: <span className="font-bold">0815 7336 0009</span>.</p>
                    </div>
                    <div className="flex flex-col justify-center bg-muted/20 p-6 border-l-4 border-secondary">
                        <p className="text-xs italic leading-relaxed text-muted-foreground font-medium">
                            "Biaya pendaftaran <span className="text-red-600 font-bold uppercase tracking-widest">tidak dapat dikembalikan</span>. Berkas yang tidak disertai biaya pendaftaran tidak akan diproses untuk tes masuk."
                        </p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 4,
        label: "TAHAP 4",
        short: "Mengikuti Tes Seleksi Penerimaan",
        title: "Mengikuti Tes Seleksi Penerimaan",
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <p className="text-xs italic text-muted-foreground leading-relaxed border-b border-border pb-4">
                            Berkas pendaftaran yang telah dikumpulkan akan diseleksi oleh Direktur Admisi STT Bandung. Setelah seleksi dokumen, surat panggilan tes dan instruksi detil mengenai pelaksanaan tes masuk akan dikirimkan via email dan pendaftar akan menerima notifikasi melalui Whatsapp.
                        </p>
                        <div className="space-y-4">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary">Mengikuti 5 Tes Penerimaan Online:</h4>
                            <div className="space-y-4 pl-4 border-l-2 border-secondary/30">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-primary uppercase">1. Psikotes (3 tahapan tes):</p>
                                    <p className="text-[11px] text-muted-foreground">1. Pengisian Form | 2. Tes Bersama | 3. Wawancara Psikolog</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-primary uppercase">2. Pengetahuan Teologi</p>
                                    <p className="text-[11px] text-muted-foreground">Menguji pengetahuan calon mahasiswa mengenai tokoh-tokoh Alkitab dan pemahaman iman.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-primary uppercase">3. Bahasa Indonesia</p>
                                    <p className="text-[11px] text-muted-foreground">Menguji tata bahasa, memahami bacaan, dan menulis ide-ide dalam bahasa Indonesia.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-primary uppercase">4. Bahasa Inggris</p>
                                    <p className="text-[11px] text-muted-foreground">Menguji kemampuan tata bahasa dan pemahaman teks bahasa Inggris.</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-primary uppercase">5. Wawancara (dengan dosen STTB)</p>
                                    <p className="text-[11px] text-muted-foreground">Penilaian terbesar untuk menguji keseriusan panggilan dan rencana pelayanan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-6 bg-primary text-primary-foreground rounded-sm space-y-4 text-xs italic leading-relaxed">
                            <p>Bila dokumen memenuhi persyaratan dan pembayaran telah dilunasi maka pendaftar akan menerima surat tes masuk.</p>
                            <p>Pendaftar yang berkasnya tidak lolos seleksi dokumen pendaftaran tidak akan dipanggil untuk ikut tes.</p>
                        </div>
                        <ul className="text-[10px] space-y-2 text-muted-foreground font-medium uppercase tracking-tight list-disc pl-4 opacity-70">
                            <li>Bila belum memiliki KTP harap cantumkan kartu pelajar</li>
                            <li>Bila ijazah belum terbit sertakan surat keterangan dari sekolah</li>
                            <li>Bagi mahasiswa pindahan wajib menyertakan surat pindah/keluar</li>
                            <li>Bila tidak memiliki BPJS atau KIS maka harus menyertakan surat pernyataan tanggung biaya mandiri</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 5,
        label: "TAHAP 5",
        short: "Pengumuman Penerimaan & Konfirmasi MABA",
        title: "Pengumuman Penerimaan & Konfirmasi MABA",
        content: (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { text: "Dalam kurun waktu 2-3 minggu setelah tanggal tes terakhir, pendaftar akan menerima pemberitahuan hasil penerimaan." },
                        { text: "Surat keputusan penerimaan akan dikirimkan melalui email dan notifikasi diberikan melalui Whatsapp." },
                        { text: "Calon mahasiswa yang diterima wajib mengisi dan mengembalikan formulir konfirmasi untuk menjadi mahasiswa." },
                        { text: "Form konfirmasi dikirimkan kembali kepada pihak STTB melalui email." },
                        { text: "Mahasiswa baru menyelesaikan pembayaran uang kuliah dan administrasi pertama lalu mengikuti proses orientasi." },
                        { text: "Mahasiswa resmi diterima dan selanjutnya proses studi mahasiswa akan ditangani oleh bagian kemahasiswaan & akademik." }
                    ].map((item, i) => (
                        <div key={i} className="p-6 border border-border/50 bg-muted/10 rounded-sm italic text-xs leading-relaxed text-muted-foreground">
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
];

const ProsedurAdmisiPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <div className="bg-background min-h-screen font-sans pb-24 pt-20">
            {/* --- HEADER SECTION (Matches Screenshot 1 Layout) --- */}
            <section className="pt-24 pb-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
                        {/* Title Block */}
                        <div className="lg:w-1/3">
                            <h2 className="text-red-600 font-black tracking-tighter text-2xl md:text-3xl uppercase leading-none">
                                PROSEDUR PENERIMAAN
                            </h2>
                            <h1 className="text-primary font-black tracking-tighter text-5xl md:text-7xl uppercase leading-none">
                                MAHASISWA
                            </h1>
                        </div>

                        {/* Quick Nav Images */}
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {categoryLinks.map((item, idx) => (
                                <a key={idx} href={item.href} className="group relative h-40 overflow-hidden rounded-sm no-underline border border-border shadow-sm">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent" />
                                    <div className="absolute bottom-4 left-0 w-full text-center">
                                        <span className="text-primary-foreground font-black tracking-[0.3em] text-xs uppercase group-hover:text-secondary transition-colors">
                                            {item.title}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* --- MAIN INTERACTIVE WORKFLOW --- */}
                    <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16 min-h-[600px]">

                        {/* SIDEBAR NAVIGATION (TAHAP 1-5) */}
                        <div className="lg:w-1/3 w-full space-y-1">
                            {steps.map((step) => (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(step.id)}
                                    className={`relative w-full text-left p-6 transition-all duration-300 flex items-center justify-between group border-l-4 rounded-sm ${activeStep === step.id
                                        ? "bg-muted border-primary shadow-lg translate-x-2"
                                        : "bg-card border-transparent hover:bg-muted/50 hover:border-secondary"
                                        }`}
                                >
                                    <div className="space-y-1">
                                        <h3 className={`text-sm font-black uppercase tracking-widest ${activeStep === step.id ? "text-primary" : "text-muted-foreground opacity-60"}`}>
                                            {step.label}
                                        </h3>
                                        <p className={`text-[10px] font-bold uppercase tracking-tight leading-tight ${activeStep === step.id ? "text-foreground" : "text-muted-foreground/40"}`}>
                                            {step.short}
                                        </p>
                                    </div>
                                    <ChevronRight
                                        size={20}
                                        className={`transition-colors ${activeStep === step.id ? "text-red-600" : "text-border group-hover:text-primary"}`}
                                    />

                                    {/* Arrow pointer for active state */}
                                    {activeStep === step.id && (
                                        <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[10px] border-l-primary" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* MAIN CONTENT AREA */}
                        <div className="lg:w-2/3 w-full bg-card border border-border p-10 md:p-16 rounded-sm shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border pb-8">
                                    <div className="space-y-2">
                                        <h2 className="text-primary font-bold font-serif text-3xl md:text-5xl tracking-tighter uppercase leading-none">
                                            {steps[activeStep - 1].label}
                                        </h2>
                                        <h3 className="text-muted-foreground font-medium text-lg italic tracking-tight">
                                            {steps[activeStep - 1].title}
                                        </h3>
                                    </div>
                                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-primary border border-border opacity-40">
                                        {activeStep === 1 && <Monitor size={32} />}
                                        {activeStep === 2 && <FileEdit size={32} />}
                                        {activeStep === 3 && <Wallet size={32} />}
                                        {activeStep === 4 && <UserCheck size={32} />}
                                        {activeStep === 5 && <MailCheck size={32} />}
                                    </div>
                                </div>

                                <div className="animate-fade-in">
                                    {steps[activeStep - 1].content}
                                </div>

                                <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        <Info size={14} className="text-secondary" />
                                        Gunakan tombol di kiri untuk navigasi antar tahap
                                    </p>
                                    <a
                                        href="https://sis.sttb.ac.id/pmb"
                                        target="_blank"
                                        className="text-xs font-black text-primary hover:text-secondary uppercase tracking-[0.2em] no-underline flex items-center gap-2 transition-colors"
                                    >
                                        Portal PMB <ArrowRight size={16} />
                                    </a>
                                </div>
                            </div>

                            {/* Background Watermark */}
                            <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none">
                                <img src="https://sttb.ac.id/storage/2023/11/Logo-STTB-2023.png" alt="watermark" className="w-96" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- ACTION SECTION --- */}
            <section className="py-24 bg-primary relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-10">
                        <div className="space-y-4">
                            <h3 className="text-3xl md:text-5xl font-black font-serif uppercase tracking-tighter text-secondary leading-none">Siap Menjadi Pastor-Scholar?</h3>
                            <p className="text-primary-foreground/70 text-lg italic leading-relaxed max-w-2xl mx-auto border-t border-primary-foreground/10 pt-6">
                                "Mulailah langkah pertama Anda hari ini melalui sistem pendaftaran yang transparan dan profesional."
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a href="https://sis.sttb.ac.id/pmb" target="_blank" className="px-12 py-5 bg-secondary text-secondary-foreground font-black uppercase tracking-widest text-xs rounded-sm hover:opacity-90 transition-all shadow-xl no-underline">
                                Mulai Registrasi Online
                            </a>
                            <a href="mailto:admisi@sttb.ac.id" className="px-12 py-5 border border-primary-foreground/20 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-sm hover:bg-primary-foreground/10 transition-all no-underline">
                                Hubungi Admisi
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProsedurAdmisiPage;