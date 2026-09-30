/**
 * ==============================================================================
 * DOCUCRAFT DIGITAL - SURAT & CV GENERATOR CONTROLLER
 * ==============================================================================
 */

// Application Global State
const state = {
  activeMode: 'letter', // 'letter' | 'cv'
  zoomLevel: 1.0,

  // Letter State
  letterSignatureDataUrl: null,
  letterStampDataUrl: null,
  letterLogoDataUrl: null,
  penColor: '#0f172a',
  penSize: 3.5,
  isDrawing: false,
  lastX: 0,
  lastY: 0,

  // CV State
  cvPhotoDataUrl: null,
  cvAccentColor: '#1e40af',
  cvExperiences: [],
  cvEducations: [],
  cvCertifications: []
};

/**
 * ==============================================================================
 * PRESET TEMPLATES: SURAT DIGITAL
 * ==============================================================================
 */
const letterTemplates = {
  undangan_rapat: {
    useKop: true,
    fontStyle: 'font-serif-formal',
    instansiNama: 'PT NUSANTARA KARYA DIGITAL',
    instansiSub: 'DIREKTORAT TEKNOLOGI & INFORMASI',
    instansiAlamat: 'Jl. MH Thamrin No. 88, Menteng, Jakarta Pusat 10350',
    instansiKontak: 'Telp: (021) 2345-6789',
    instansiEmailWeb: 'Email: kontak@nusantarakarya.id | www.nusantarakarya.id',
    kotaSurat: 'Jakarta',
    tanggalSurat: new Date().toISOString().split('T')[0],
    nomorSurat: '108/NKD-DIR/VIII/2026',
    lampiran: '-',
    perihal: 'Undangan Rapat Koordinasi Kuartal III',
    penerimaSapaan: 'Kepada Yth.',
    penerimaNama: 'Seluruh Pimpinan Divisi & Manajer Proyek',
    penerimaInstansi: 'PT Nusantara Karya Digital',
    penerimaAlamat: 'di Tempat',
    salamPembuka: 'Dengan hormat,',
    paragrafPembuka: 'Sehubungan dengan pelaksanaan evaluasi program kerja dan akselerasi implementasi proyek strategis kuartal ketiga tahun 2026, bersama ini kami mengundang Bapak/Ibu untuk hadir pada agenda rapat koordinasi yang akan dilaksanakan pada:',
    isiRincian: 'Hari / Tanggal : Senin, 24 Agustus 2026\nWaktu          : 09.00 - 12.00 WIB\nTempat         : Ruang Rapat Eksekutif Lt. 5 & Virtual Teleconference\nAgenda         : Pembahasan Capaian Q3 & Finalisasi Roadmap Digitalisasi',
    paragrafPenutup: 'Mengingat pentingnya agenda pembahasan tersebut, kami sangat mengharapkan kehadiran Bapak/Ibu tepat pada waktunya. Atas perhatian, kerja sama, dan kehadiran Bapak/Ibu, kami sampaikan terima kasih.',
    salamPenutup: 'Hormat kami,',
    jabatanPengirim: 'Direktur Operasional & Teknologi',
    namaPengirim: 'Dr. Hendra Wijaya, S.Kom., M.T.',
    nipPengirim: 'NIK. 2016-09-0042',
    tembusan: '1. Direktur Utama PT Nusantara Karya Digital\n2. Arsip Bagian Sekretariat',
    useQr: true
  },
  izin_kerja: {
    useKop: false,
    fontStyle: 'font-serif-formal',
    instansiNama: '',
    instansiSub: '',
    instansiAlamat: '',
    instansiKontak: '',
    instansiEmailWeb: '',
    kotaSurat: 'Bandung',
    tanggalSurat: new Date().toISOString().split('T')[0],
    nomorSurat: '-',
    lampiran: '1 (Satu) Lembar Surat Keterangan Dokter',
    perihal: 'Permohonan Izin Tidak Masuk Kerja (Sakit)',
    penerimaSapaan: 'Kepada Yth.',
    penerimaNama: 'Bapak/Ibu Manajer HRD & Operasional',
    penerimaInstansi: 'PT Cipta Solusi Mandiri',
    penerimaAlamat: 'di Tempat',
    salamPembuka: 'Dengan hormat,',
    paragrafPembuka: 'Saya yang bertanda tangan di bawah ini:\n\nNama        : Amanda Putri Kartika, S.T.\nNIP / ID    : CSM-2022-887\nDivisi      : Software Engineering / Product Development\nJabatan     : Senior Frontend Engineer\n\nBermaksud mengajukan permohonan izin tidak dapat masuk bekerja selama 2 (dua) hari kerja, terhitung mulai tanggal 18 Agustus 2026 sampai dengan 19 Agustus 2026 dikarenakan kondisi kesehatan yang kurang baik dan disarankan untuk beristirahat oleh dokter.',
    isiRincian: 'Sebagai bukti pendukung, saya lampirkan surat keterangan istirahat dari dokter pada lampiran surat ini. Selama masa izin, tugas-tugas kritis harian telah saya koordinasikan dengan rekan satu tim.',
    paragrafPenutup: 'Demikian surat permohonan izin ini saya sampaikan dengan sebenar-benarnya. Atas pengertian, perhatian, dan izin yang Bapak/Ibu berikan, saya ucapkan terima kasih.',
    salamPenutup: 'Hormat saya,',
    jabatanPengirim: 'Pemohon / Karyawan',
    namaPengirim: 'Amanda Putri Kartika, S.T.',
    nipPengirim: 'ID: CSM-2022-887',
    tembusan: '',
    useQr: true
  },
  lamaran_kerja: {
    useKop: false,
    fontStyle: 'font-serif-formal',
    instansiNama: '',
    instansiSub: '',
    instansiAlamat: '',
    instansiKontak: '',
    instansiEmailWeb: '',
    kotaSurat: 'Surabaya',
    tanggalSurat: new Date().toISOString().split('T')[0],
    nomorSurat: '-',
    lampiran: '5 (Lima) Berkas Portofolio & CV',
    perihal: 'Lamaran Pekerjaan - Lead UI/UX Designer',
    penerimaSapaan: 'Kepada Yth.',
    penerimaNama: 'HR Recruitment Department',
    penerimaInstansi: 'PT Teknologi Bangsa Inovasi',
    penerimaAlamat: 'Jl. Pemuda No. 120, Surabaya',
    salamPembuka: 'Dengan hormat,',
    paragrafPembuka: 'Berdasarkan informasi lowongan pekerjaan yang dipublikasikan pada portal rekrutmen resmi perusahaan, dengan ini saya bermaksud mengajukan diri untuk bergabung dengan PT Teknologi Bangsa Inovasi pada posisi Lead UI/UX Designer.\n\nSaya memiliki latar belakang pendidikan Sarjana Desain Komunikasi Visual dengan pengalaman lebih dari 4 tahun dalam merancang antarmuka sistem digital modern yang berorientasi pada kepuasan pengguna.',
    isiRincian: 'Sebagai bahan pertimbangan Bapak/Ibu, bersama surat ini saya lampirkan:\n1. Curriculum Vitae (CV) Terbaru\n2. Salinan Ijazah dan Transkrip Nilai\n3. Portofolio Proyek Desain UI/UX & Prototipe\n4. Salinan Sertifikasi Profesional UX Design\n5. Pas Foto Terbaru Ukuran 4x6',
    paragrafPenutup: 'Besar harapan saya untuk diberikan kesempatan menghadiri sesi wawancara agar dapat menjelaskan secara lebih komprehensif mengenai kualifikasi, dedikasi, serta kontribusi yang dapat saya berikan untuk kemajuan perusahaan. Atas perhatian dan kesempatan yang diberikan, saya ucapkan terima kasih.',
    salamPenutup: 'Hormat saya,',
    jabatanPengirim: 'Pelamar Pekerjaan',
    namaPengirim: 'Rizky Ramadhan, S.Ds.',
    nipPengirim: 'Telp: 0812-3456-7890',
    tembusan: '',
    useQr: false
  },
  surat_tugas: {
    useKop: true,
    fontStyle: 'font-serif-formal',
    instansiNama: 'DINAS KOMUNIKASI DAN INFORMATIKA',
    instansiSub: 'PEMERINTAH PROVINSI DAERAH KHUSUS JAKARTA',
    instansiAlamat: 'Balai Kota Blok G Lt. 10, Jl. Medan Merdeka Selatan No. 8-9, Jakarta Pusat',
    instansiKontak: 'Telp: (021) 3822-225',
    instansiEmailWeb: 'Email: diskominfo@jakarta.go.id | diskominfotik.jakarta.go.id',
    kotaSurat: 'Jakarta',
    tanggalSurat: new Date().toISOString().split('T')[0],
    nomorSurat: '094 / ST / DISKOMINFO / VIII / 2026',
    lampiran: '-',
    perihal: 'SURAT PERINTAH TUGAS DINAS',
    penerimaSapaan: 'Dasar Penugasan:',
    penerimaNama: 'Program Implementasi Transformasi SPBE Terpadu 2026',
    penerimaInstansi: 'Dinas Komunikasi, Informatika dan Statistik',
    penerimaAlamat: 'MEMERINTAHKAN:',
    salamPembuka: 'Kepada Pegawai / Tim Teknis berikut:',
    paragrafPembuka: '1. Nama   : Fajar Pratama, M.Kom (NIP. 19890615 201201 1 003) - Pranata Komputer Ahli Muda\n2. Nama   : Sintia Dewi, S.Kom (NIP. 19931120 201802 2 001) - Analis Sistem Informasi\n\nUntuk melaksanakan tugas dinas asistensi teknis dan pengujian keamanan infrastruktur aplikasi sistem layanan publik yang berlokasi di Unit Pelaksana Teknis Wilayah Jakarta Selatan.',
    isiRincian: 'Jadwal Pelaksanaan:\nHari / Tanggal : Rabu - Jumat, 26 - 28 Agustus 2026\nWaktu          : 08.30 WIB - Selesai\nLokasi         : Kantor Pengelola SPBE UPT Jakarta Selatan\nOutput         : Laporan Berita Acara Pengujian Teknis & Audit Keamanan',
    paragrafPenutup: 'Demikian surat tugas ini diterbitkan untuk dilaksanakan dengan penuh rasa tanggung jawab serta melaporkan hasil pelaksanaan tugas kepada pimpinan setelah kegiatan selesai dilaksanakan.',
    salamPenutup: 'Ditetapkan di Jakarta,',
    jabatanPengirim: 'Kepala Dinas Komunikasi & Informatika',
    namaPengirim: 'Ir. H. Budi Santoso, M.Si.',
    nipPengirim: 'NIP. 19740510 199803 1 001',
    tembusan: '1. Sekretaris Daerah Provinsi DKI Jakarta\n2. Inspektorat Provinsi DKI Jakarta',
    useQr: true
  },
  keterangan_aktif: {
    useKop: true,
    fontStyle: 'font-serif-formal',
    instansiNama: 'UNIVERSITAS TEKNOLOGI NUSANTARA',
    instansiSub: 'FAKULTAS ILMU KOMPUTER & TEKNOLOGI INFORMASI',
    instansiAlamat: 'Kampus Terpadu Jl. Ring Road Utara No. 99, Sleman, D.I. Yogyakarta 55281',
    instansiKontak: 'Telp: (0274) 555-1234',
    instansiEmailWeb: 'Email: dekanat.fikti@utn.ac.id | www.fikti.utn.ac.id',
    kotaSurat: 'Yogyakarta',
    tanggalSurat: new Date().toISOString().split('T')[0],
    nomorSurat: '420/UN-FIKTI/KM/VIII/2026',
    lampiran: '-',
    perihal: 'SURAT KETERANGAN MAHASISWA AKTIF',
    penerimaSapaan: 'Dekan Fakultas Ilmu Komputer & Teknologi Informasi menerangkan bahwa:',
    penerimaNama: 'Nama Lengkap  : Dimas Surya Ardiansyah',
    penerimaInstansi: 'NIM / Angkatan: 22.11.4580 / Tahun 2022',
    penerimaAlamat: 'Program Studi : S1 Teknik Informatika (Status: Aktif)',
    salamPembuka: '',
    paragrafPembuka: 'Adalah benar yang bersangkutan tercatat sebagai mahasiswa aktif jenjang Strata 1 (S1) Program Studi Teknik Informatika pada Semester Ganjil Tahun Akademik 2026/2027 di Fakultas Ilmu Komputer, Universitas Teknologi Nusantara.',
    isiRincian: 'Surat keterangan ini diberikan kepada yang bersangkutan sebagai kelengkapan berkas administrasi Pengajuan Beasiswa Peningkatan Prestasi Akademik dan Tunjangan Pendidikan.',
    paragrafPenutup: 'Demikian surat keterangan ini kami terbitkan dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.',
    salamPenutup: 'Yogyakarta,',
    jabatanPengirim: 'a.n. Dekan FIKTI UTN\nWakil Dekan Bidang Akademik & Kemahasiswaan',
    namaPengirim: 'Prof. Dr. Ir. Wahyu Wibowo, M.T.',
    nipPengirim: 'NIP. 19780824 200501 1 002',
    tembusan: '1. Bagian Administrasi Akademik\n2. Arsip Kemahasiswaan',
    useQr: true
  },
  pernyataan: {
    useKop: false,
    fontStyle: 'font-serif-formal',
    instansiNama: '',
    instansiSub: '',
    instansiAlamat: '',
    instansiKontak: '',
    instansiEmailWeb: '',
    kotaSurat: 'Jakarta',
    tanggalSurat: new Date().toISOString().split('T')[0],
    nomorSurat: '-',
    lampiran: '-',
    perihal: 'SURAT PERNYATAAN KESANGGUPAN BEKERJA',
    penerimaSapaan: 'Yang bertanda tangan di bawah ini:',
    penerimaNama: 'Nama Lengkap  : Kevin Adriansyah, S.Kom.',
    penerimaInstansi: 'NIK           : 3174091204960003',
    penerimaAlamat: 'Alamat        : Jl. Kemang Raya No. 42, Jakarta Selatan',
    salamPembuka: '',
    paragrafPembuka: 'Menyatakan dengan sesungguhnya dan penuh kesadaran bahwa saya bersedia mematuhi segala ketentuan dan peraturan yang berlaku di PT Kreasi Media Nusantara, serta bersedia ditempatkan di unit kerja yang ditentukan oleh manajemen perusahaan.',
    isiRincian: 'Apabila di kemudian hari saya terbukti melanggar butir-butir pernyataan ini atau melakukan tindakan indisipliner, saya bersedia menerima segala sanksi administratif sesuai dengan peraturan perusahaan dan perundang-undangan ketenagakerjaan yang berlaku.',
    paragrafPenutup: 'Demikian surat pernyataan ini saya buat dengan sebenar-benarnya tanpa ada paksaan atau tekanan dari pihak manapun, untuk digunakan sebagai syarat kelengkapan administrasi.',
    salamPenutup: 'Yang membuat pernyataan,',
    jabatanPengirim: '',
    namaPengirim: 'Kevin Adriansyah, S.Kom.',
    nipPengirim: 'Materai Rp 10.000,-',
    tembusan: '',
    useQr: false
  }
};

/**
 * ==============================================================================
 * PRESET TEMPLATES: CV (CURRICULUM VITAE)
 * ==============================================================================
 */
const cvTemplates = {
  d3_it_ats: {
    layout: 'layout-ats',
    font: 'font-sans',
    accentColor: '#0f172a',
    showPhoto: false,
    fullName: 'Dimas Bagus Anggoro, A.Md.Kom.',
    headline: 'Quality Control / IT Support & Administrasi',
    email: 'dimas.bagus@email.com',
    phone: '+62 821-4567-8901',
    location: 'Kab. Tegal, Jawa Tengah, Indonesia',
    linkedin: 'linkedin.com/in/dimasbagus',
    portfolio: 'dimas-portfolio.my.id',
    summary: 'Lulusan D3 Teknik Informatika dengan pengalaman di bidang Quality Control dan IT Support. Terbiasa melakukan pemeriksaan, pengolahan data, penyusunan laporan, dan administrasi dokumen. Memiliki kemampuan Microsoft Office, data entry, serta dasar pengembangan aplikasi web. Teliti, mampu mengikuti prosedur kerja, dan siap berkembang di bidang administrasi, dokumentasi, pengolahan data, maupun teknologi informasi.',
    hardSkills: 'Microsoft Excel, Microsoft Word, Data Entry, Pengolahan Data, Administrasi Dokumen, Digital Filing, HTML, CSS, JavaScript, React.js, Figma, CorelDRAW, Canva',
    softSkills: 'Problem Solving, Komunikasi Efektif, Manajemen Waktu, Kolaborasi',
    languages: 'Bahasa Indonesia - Penutur Asli\nBahasa Inggris - Tingkat Menengah (Pemahaman Tertulis)',
    experiences: [
      {
        id: 'exp_1',
        role: 'Quality Control',
        company: 'PT Winners International',
        location: 'Tegal',
        period: 'Jan 2023 - Jun 2023',
        desc: '• Memeriksa kualitas produk garmen berdasarkan standar dan kriteria pemeriksaan yang ditetapkan perusahaan.\n• Mengidentifikasi produk yang tidak sesuai standar sebelum proses distribusi.\n• Memastikan hasil pemeriksaan sesuai dengan ketentuan dan prosedur kerja yang berlaku.'
      },
      {
        id: 'exp_2',
        role: 'IT Support',
        company: 'Politeknik Baja Tegal',
        location: 'Kab. Tegal',
        period: 'Des 2025 - Januari 2026',
        desc: '• Mendukung pengembangan antarmuka sistem pemantauan data dosen dan karyawan.\n• Membantu pengolahan dan pengelolaan data menggunakan Microsoft Excel.\n• Melakukan pengecekan dan penyesuaian data untuk mendukung kebutuhan operasional.'
      }
    ],
    educations: [
      {
        id: 'edu_1',
        school: 'Politeknik Baja Tegal',
        degree: 'Ahli Madya Komputer (A.Md.Kom.) - Teknik Informatika',
        year: '2023 - 2026',
        gpa: 'IPK: 3.83 / 4.00',
        notes: 'Organisasi: Sekretaris Forum Studi Ilmiah, 2024 - 2025'
      }
    ],
    certifications: [
      {
        id: 'cert_1',
        name: 'Front-End dan Back-End Development',
        issuer: 'DBS Foundation',
        year: '2025'
      }
    ]
  },
  software_engineer: {
    layout: 'layout-sidebar',
    font: 'font-sans',
    accentColor: '#1e40af',
    showPhoto: true,
    fullName: 'Rizky Pratama, S.Kom.',
    headline: 'Senior Frontend Engineer / Web Architect',
    email: 'rizky.pratama@email.com',
    phone: '+62 812-3456-7890',
    location: 'Jakarta Selatan, Indonesia',
    linkedin: 'linkedin.com/in/rizkypratama',
    portfolio: 'github.com/rizkydev',
    summary: 'Software Engineer berdedikasi dengan pengalaman lebih dari 4 tahun dalam membangun aplikasi web skala enterprise yang cepat, aman, dan berorientasi pada kepuasan pengguna. Memiliki keahlian mendalam pada ekosistem JavaScript modern (React, TypeScript, Next.js), arsitektur micro-frontend, serta implementasi CI/CD.',
    hardSkills: 'JavaScript, TypeScript, React.js, Next.js, HTML5 & CSS3, Node.js, REST API, GraphQL, Git, Tailwind CSS, Webpack, Unit Testing',
    softSkills: 'Problem Solving, Kepemimpinan Tim, Komunikasi Efektif, Manajemen Waktu, Kolaborasi Agile Scrum',
    languages: 'Bahasa Indonesia - Penutur Asli (Native)\nBahasa Inggris - Fasih Profesional (Professional Working)',
    experiences: [
      {
        id: 'exp_1',
        role: 'Senior Frontend Engineer',
        company: 'PT Global Digital Solusindo',
        location: 'Jakarta',
        period: 'Jan 2023 - Sekarang',
        desc: '• Memimpin perancangan dan refaktorisasi arsitektur frontend web app utama, meningkatkan kecepatan load page hingga 45%.\n• Mengembangkan reusable component design system yang diadopsi oleh 15+ engineer.\n• Berkolaborasi erat dengan Product Manager dan UX Designer untuk merilis 8 fitur unggulan tepat waktu.'
      },
      {
        id: 'exp_2',
        role: 'Frontend Web Developer',
        company: 'PT Nusantara Inovasi Teknologi',
        location: 'Bandung',
        period: 'Agu 2020 - Des 2022',
        desc: '• Mengembangkan dashboard analytics berbasis React.js dan Tailwind CSS yang memproses 100K+ transaksi bulanan.\n• Mengintegrasikan RESTful API dan state management terpusat menggunakan Redux Toolkit.\n• Mengoptimalkan SEO on-page dan Core Web Vitals hingga mencapai skor Lighthouse 95+.'
      }
    ],
    educations: [
      {
        id: 'edu_1',
        school: 'Universitas Indonesia',
        degree: 'Sarjana Komputer (S.Kom) - Ilmu Komputer',
        year: '2016 - 2020',
        gpa: 'IPK: 3.82 / 4.00 (Cumlaude)',
        notes: 'Ketua Divisi Riset & Teknologi Himpunan Mahasiswa Ilmu Komputer.'
      }
    ],
    certifications: [
      {
        id: 'cert_1',
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        year: '2024'
      },
      {
        id: 'cert_2',
        name: 'Professional Frontend Developer Certification',
        issuer: 'Meta / Coursera',
        year: '2022'
      }
    ]
  },
  hr_admin: {
    layout: 'layout-sidebar',
    font: 'font-sans',
    accentColor: '#059669',
    showPhoto: true,
    fullName: 'Siti Rahmawati, S.Psi.',
    headline: 'Human Resources & Talent Acquisition Specialist',
    email: 'siti.rahmawati@email.com',
    phone: '+62 813-9876-5432',
    location: 'Surabaya, Jawa Timur',
    linkedin: 'linkedin.com/in/sitirahma-hr',
    portfolio: 'sitirahma-portfolio.id',
    summary: 'Spesialis Human Resources dengan pengalaman 3+ tahun di bidang rekrutmen end-to-end, manajemen performa karyawan, dan pengembangan budaya kerja organisasi. Telah berhasil merekrut 120+ talenta berkualitas di industri teknologi dan ritel.',
    hardSkills: 'End-to-End Recruitment, HRIS & Payroll (Talenta, Workday), Employee Relations, Onboarding, Job Grading, Ketenagakerjaan UU Cipta Kerja',
    softSkills: 'Negosiasi, Empati Tinggi, Active Listening, Manajemen Konflik, Public Speaking',
    languages: 'Bahasa Indonesia - Penutur Asli (Native)\nBahasa Inggris - Tingkat Lanjutan (TOEFL 570)',
    experiences: [
      {
        id: 'exp_1',
        role: 'Talent Acquisition & HR Officer',
        company: 'PT Multi Karya Sentosa',
        location: 'Surabaya',
        period: 'Mar 2022 - Sekarang',
        desc: '• Mengelola proses sourcing dan rekrutmen dari level staf hingga manajerial dengan time-to-hire rata-rata 18 hari.\n• Menyusun standar operasional onboarding baru yang meningkatkan kepuasan karyawan baru sebesar 30%.\n• Mengorganisir kegiatan employee engagement bulanan dan evaluasi kinerja berkala (KPI & OKR).'
      },
      {
        id: 'exp_2',
        role: 'HR & Administrative Assistant',
        company: 'PT Prima Logistik Indonesia',
        location: 'Surabaya',
        period: 'Jan 2021 - Feb 2022',
        desc: '• Mengelola absensi, reimbursement, data administrasi 250+ karyawan secara akurat.\n• Mengkoordinasikan proses seleksi administrasi dan penjadwalan psikotes calon karyawan.'
      }
    ],
    educations: [
      {
        id: 'edu_1',
        school: 'Universitas Airlangga',
        degree: 'Sarjana Psikologi (S.Psi)',
        year: '2016 - 2020',
        gpa: 'IPK: 3.75 / 4.00',
        notes: 'Fokus pada Psikologi Industri dan Organisasi (PIO).'
      }
    ],
    certifications: [
      {
        id: 'cert_1',
        name: 'Certified Human Resource Professional (CHRP)',
        issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
        year: '2023'
      }
    ]
  },
  fresh_grad: {
    layout: 'layout-ats',
    font: 'font-sans',
    accentColor: '#0f172a',
    showPhoto: false,
    fullName: 'Dimas Bagus Anggoro, S.M.',
    headline: 'Business Management & Operations Graduate',
    email: 'dimas.bagus@email.com',
    phone: '+62 821-4567-8901',
    location: 'Yogyakarta, Indonesia',
    linkedin: 'linkedin.com/in/dimasbagus-sm',
    portfolio: 'dimas-portfolio.my.id',
    summary: 'Lulusan Sarjana Manajemen Bisnis dengan pemahaman solid dalam riset pasar, analisis data operasional, dan manajemen proyek. Memiliki rekam jejak kepemimpinan organisasi kemahasiswaan serta pengalaman magang di perusahaan fintech nasional.',
    hardSkills: 'Data Analysis (Excel / Google Sheets, SPSS), Project Management (Trello, Notion), Market Research, Financial Modeling Dasar, Pitch Deck Creation',
    softSkills: 'Critical Thinking, Kepemimpinan, Adaptabilitas Tinggi, Kolaborasi Tim, Presentasi Efektif',
    languages: 'Bahasa Indonesia - Penutur Asli\nBahasa Inggris - Mahir (IELTS 7.0)',
    experiences: [
      {
        id: 'exp_1',
        role: 'Business Development & Operations Intern',
        company: 'PT Fintek Cipta Nusantara',
        location: 'Jakarta (Remote)',
        period: 'Agu 2023 - Jan 2024',
        desc: '• Melakukan riset komparatif kompetitor pada 20+ produk pinjaman produktif UMKM.\n• Membantu menyusun laporan bulanan performa akuisisi merchant rekanan dengan tingkat akurasi data 99%.\n• Menginisiasi perbaikan alur registrasi mitra baru yang memangkas waktu verifikasi hingga 20%.'
      }
    ],
    educations: [
      {
        id: 'edu_1',
        school: 'Universitas Gadjah Mada',
        degree: 'Sarjana Manajemen (S.M) - Manajemen Bisnis',
        year: '2020 - 2024',
        gpa: 'IPK: 3.86 / 4.00 (Cumlaude)',
        notes: 'Juara 2 National Business Plan Competition 2023.'
      }
    ],
    certifications: [
      {
        id: 'cert_1',
        name: 'Google Data Analytics Professional Certificate',
        issuer: 'Google / Coursera',
        year: '2024'
      }
    ]
  },
  uiux_designer: {
    layout: 'layout-sidebar',
    font: 'font-sans',
    accentColor: '#6b21a8',
    showPhoto: true,
    fullName: 'Nadia Valerie, S.Ds.',
    headline: 'Senior UI/UX & Product Designer',
    email: 'nadia.valerie@email.com',
    phone: '+62 856-7890-1234',
    location: 'Jakarta Barat, Indonesia',
    linkedin: 'linkedin.com/in/nadiavalerie',
    portfolio: 'behance.net/nadiavalerie',
    summary: 'Product Designer dengan 5+ tahun pengalaman menciptakan antarmuka digital yang memikat dan intuitif untuk aplikasi mobile dan web B2C/B2B. Ahli dalam design thinking, pembuatan design system berskala besar, serta usability testing berbasis data.',
    hardSkills: 'Figma, Adobe XD, Design Systems, Wireframing, Interactive Prototyping, Usability Testing, User Journey Mapping, Micro-interactions',
    softSkills: 'User Empathy, Storytelling, Cross-functional Collaboration, Visual Aesthetic, Strategic Thinking',
    languages: 'Bahasa Indonesia - Penutur Asli\nBahasa Inggris - Fasih Profesional',
    experiences: [
      {
        id: 'exp_1',
        role: 'Lead Product Designer',
        company: 'PT Kreasi Solusi Interaktif',
        location: 'Jakarta',
        period: 'Feb 2022 - Sekarang',
        desc: '• Memimpin tim beranggotakan 4 desainer dalam meredesain total aplikasi e-commerce dengan 500K+ MAU.\n• Meningkatkan conversion rate checkout funnel sebesar 24% pasca-implementasi UI baru.\n• Membangun Atomic Design System terpadu dengan 200+ komponen modular di Figma.'
      },
      {
        id: 'exp_2',
        role: 'UI/UX Designer',
        company: 'PT Inovasi Media Kreatif',
        location: 'Jakarta',
        period: 'Jul 2019 - Jan 2022',
        desc: '• Merancang user flow, wireframe, dan prototype interaktif untuk 12+ proyek aplikasi klien nasional.\n• Menjalankan riset kualitatif dan pengujian usability testing kepada 50+ user responden.'
      }
    ],
    educations: [
      {
        id: 'edu_1',
        school: 'Institut Teknologi Bandung',
        degree: 'Sarjana Desain (S.Ds) - Desain Komunikasi Visual',
        year: '2015 - 2019',
        gpa: 'IPK: 3.78 / 4.00',
        notes: 'Finalis Best Interaction Design Award ITB 2019.'
      }
    ],
    certifications: [
      {
        id: 'cert_1',
        name: 'Nielsen Norman Group (NN/g) UX Master Certified',
        issuer: 'Nielsen Norman Group',
        year: '2023'
      }
    ]
  }
};

/**
 * ==============================================================================
 * DOM ELEMENTS MAP
 * ==============================================================================
 */
let DOM = {};

function cacheDomElements() {
  DOM = {
    // Mode Switchers
    btnModeLetter: document.getElementById('btnModeLetter'),
    btnModeCv: document.getElementById('btnModeCv'),
    letterEditorPanel: document.getElementById('letterEditorPanel'),
    cvEditorPanel: document.getElementById('cvEditorPanel'),
    letterPaper: document.getElementById('letterPaper'),
    cvPaper: document.getElementById('cvPaper'),
    letterTemplateWrapper: document.getElementById('letterTemplateWrapper'),
    cvTemplateWrapper: document.getElementById('cvTemplateWrapper'),
    templateSelectLetter: document.getElementById('templateSelectLetter'),
    templateSelectCv: document.getElementById('templateSelectCv'),
    paperBadgeMode: document.getElementById('paperBadgeMode'),
    printBtnLabel: document.getElementById('printBtnLabel'),

    // Global Actions
    btnOpenDrafts: document.getElementById('btnOpenDrafts'),
    btnSaveDraft: document.getElementById('btnSaveDraft'),
    btnCopyText: document.getElementById('btnCopyText'),
    btnDownloadDoc: document.getElementById('btnDownloadDoc'),
    btnPrintDoc: document.getElementById('btnPrintDoc'),
    draftCount: document.getElementById('draftCount'),

    // Letter Inputs
    fontStyleSelect: document.getElementById('fontStyleSelect'),
    toggleKopSurat: document.getElementById('toggleKopSurat'),
    kopSuratFields: document.getElementById('kopSuratFields'),
    inputKopLogo: document.getElementById('inputKopLogo'),
    btnUploadLogoTrigger: document.getElementById('btnUploadLogoTrigger'),
    btnRemoveLogo: document.getElementById('btnRemoveLogo'),
    inputInstansiNama: document.getElementById('inputInstansiNama'),
    inputInstansiSub: document.getElementById('inputInstansiSub'),
    inputInstansiAlamat: document.getElementById('inputInstansiAlamat'),
    inputInstansiKontak: document.getElementById('inputInstansiKontak'),
    inputInstansiEmailWeb: document.getElementById('inputInstansiEmailWeb'),
    inputKotaSurat: document.getElementById('inputKotaSurat'),
    inputTanggalSurat: document.getElementById('inputTanggalSurat'),
    inputNomorSurat: document.getElementById('inputNomorSurat'),
    inputLampiran: document.getElementById('inputLampiran'),
    inputPerihal: document.getElementById('inputPerihal'),
    inputPenerimaSapaan: document.getElementById('inputPenerimaSapaan'),
    inputPenerimaNama: document.getElementById('inputPenerimaNama'),
    inputPenerimaInstansi: document.getElementById('inputPenerimaInstansi'),
    inputPenerimaAlamat: document.getElementById('inputPenerimaAlamat'),
    inputSalamPembuka: document.getElementById('inputSalamPembuka'),
    inputParagrafPembuka: document.getElementById('inputParagrafPembuka'),
    inputIsiRincian: document.getElementById('inputIsiRincian'),
    inputParagrafPenutup: document.getElementById('inputParagrafPenutup'),
    inputSalamPenutup: document.getElementById('inputSalamPenutup'),
    inputTembusan: document.getElementById('inputTembusan'),
    inputJabatanPengirim: document.getElementById('inputJabatanPengirim'),
    inputNamaPengirim: document.getElementById('inputNamaPengirim'),
    inputNipPengirim: document.getElementById('inputNipPengirim'),
    toggleQrCode: document.getElementById('toggleQrCode'),
    inputUploadSign: document.getElementById('inputUploadSign'),
    inputUploadStamp: document.getElementById('inputUploadStamp'),
    btnUploadStampTrigger: document.getElementById('btnUploadStampTrigger'),
    btnRemoveStamp: document.getElementById('btnRemoveStamp'),
    btnOpenSignPad: document.getElementById('btnOpenSignPad'),
    btnClearSignature: document.getElementById('btnClearSignature'),
    signPreviewBox: document.getElementById('signPreviewBox'),
    imgSignPreview: document.getElementById('imgSignPreview'),
    btnResetForm: document.getElementById('btnResetForm'),

    // Letter Render Targets
    letterKop: document.getElementById('letterKop'),
    kopLogoContainer: document.getElementById('kopLogoContainer'),
    kopLogoImg: document.getElementById('kopLogoImg'),
    renderInstansiNama: document.getElementById('renderInstansiNama'),
    renderInstansiSub: document.getElementById('renderInstansiSub'),
    renderInstansiAlamat: document.getElementById('renderInstansiAlamat'),
    renderInstansiKontak: document.getElementById('renderInstansiKontak'),
    renderInstansiEmailWeb: document.getElementById('renderInstansiEmailWeb'),
    renderKopSep: document.getElementById('renderKopSep'),
    rowNomorSurat: document.getElementById('rowNomorSurat'),
    rowLampiran: document.getElementById('rowLampiran'),
    rowPerihal: document.getElementById('rowPerihal'),
    renderNomorSurat: document.getElementById('renderNomorSurat'),
    renderLampiran: document.getElementById('renderLampiran'),
    renderPerihal: document.getElementById('renderPerihal'),
    renderTanggalSurat: document.getElementById('renderTanggalSurat'),
    renderPenerimaSapaan: document.getElementById('renderPenerimaSapaan'),
    renderPenerimaNama: document.getElementById('renderPenerimaNama'),
    renderPenerimaInstansi: document.getElementById('renderPenerimaInstansi'),
    renderPenerimaAlamat: document.getElementById('renderPenerimaAlamat'),
    renderSalamPembuka: document.getElementById('renderSalamPembuka'),
    renderParagrafPembuka: document.getElementById('renderParagrafPembuka'),
    renderIsiRincianWrapper: document.getElementById('renderIsiRincianWrapper'),
    renderIsiRincian: document.getElementById('renderIsiRincian'),
    renderParagrafPenutup: document.getElementById('renderParagrafPenutup'),
    renderSalamPenutup: document.getElementById('renderSalamPenutup'),
    renderQrBox: document.getElementById('renderQrBox'),
    qrCodeContainer: document.getElementById('qrCodeContainer'),
    renderDocHash: document.getElementById('renderDocHash'),
    renderJabatanPengirim: document.getElementById('renderJabatanPengirim'),
    renderSignArea: document.getElementById('renderSignArea'),
    renderStampImg: document.getElementById('renderStampImg'),
    renderSignImg: document.getElementById('renderSignImg'),
    renderSignSpacing: document.getElementById('renderSignSpacing'),
    renderNamaPengirim: document.getElementById('renderNamaPengirim'),
    renderNipPengirim: document.getElementById('renderNipPengirim'),
    renderTembusanWrapper: document.getElementById('renderTembusanWrapper'),
    renderTembusanList: document.getElementById('renderTembusanList'),

    // CV Inputs
    cvLayoutSelect: document.getElementById('cvLayoutSelect'),
    cvFontSelect: document.getElementById('cvFontSelect'),
    toggleCvPhoto: document.getElementById('toggleCvPhoto'),
    cvPhotoUploadGroup: document.getElementById('cvPhotoUploadGroup'),
    inputCvPhoto: document.getElementById('inputCvPhoto'),
    btnUploadCvPhoto: document.getElementById('btnUploadCvPhoto'),
    btnRemoveCvPhoto: document.getElementById('btnRemoveCvPhoto'),
    inputCvFullName: document.getElementById('inputCvFullName'),
    inputCvHeadline: document.getElementById('inputCvHeadline'),
    inputCvEmail: document.getElementById('inputCvEmail'),
    inputCvPhone: document.getElementById('inputCvPhone'),
    inputCvLocation: document.getElementById('inputCvLocation'),
    inputCvLinkedin: document.getElementById('inputCvLinkedin'),
    inputCvPortfolio: document.getElementById('inputCvPortfolio'),
    inputCvSummary: document.getElementById('inputCvSummary'),
    btnAddCvExperience: document.getElementById('btnAddCvExperience'),
    cvExperienceList: document.getElementById('cvExperienceList'),
    btnAddCvEducation: document.getElementById('btnAddCvEducation'),
    cvEducationList: document.getElementById('cvEducationList'),
    inputCvHardSkills: document.getElementById('inputCvHardSkills'),
    inputCvSoftSkills: document.getElementById('inputCvSoftSkills'),
    btnAddCvCert: document.getElementById('btnAddCvCert'),
    cvCertList: document.getElementById('cvCertList'),
    inputCvLanguages: document.getElementById('inputCvLanguages'),
    btnResetCvForm: document.getElementById('btnResetCvForm'),

    // CV Render Targets
    renderCvAvatarContainer: document.getElementById('renderCvAvatarContainer'),
    renderCvAvatarImg: document.getElementById('renderCvAvatarImg'),
    renderCvAvatarPlaceholder: document.getElementById('renderCvAvatarPlaceholder'),
    renderCvFullName: document.getElementById('renderCvFullName'),
    renderCvHeadline: document.getElementById('renderCvHeadline'),
    renderCvEmail: document.getElementById('renderCvEmail'),
    renderCvPhone: document.getElementById('renderCvPhone'),
    renderCvLocation: document.getElementById('renderCvLocation'),
    renderCvLinkedin: document.getElementById('renderCvLinkedin'),
    renderCvPortfolio: document.getElementById('renderCvPortfolio'),
    cvContactEmailRow: document.getElementById('cvContactEmailRow'),
    cvContactPhoneRow: document.getElementById('cvContactPhoneRow'),
    cvContactLocRow: document.getElementById('cvContactLocRow'),
    cvContactLinkedinRow: document.getElementById('cvContactLinkedinRow'),
    cvContactPortoRow: document.getElementById('cvContactPortoRow'),
    renderCvAtsContactBar: document.getElementById('renderCvAtsContactBar'),
    renderCvAtsPhotoWrapper: document.getElementById('renderCvAtsPhotoWrapper'),
    renderCvAtsPhotoImg: document.getElementById('renderCvAtsPhotoImg'),
    renderCvAtsPhotoPlaceholder: document.getElementById('renderCvAtsPhotoPlaceholder'),
    renderCvSummary: document.getElementById('renderCvSummary'),
    renderCvHardSkills: document.getElementById('renderCvHardSkills'),
    renderCvSoftSkills: document.getElementById('renderCvSoftSkills'),
    renderCvSoftSkillsSection: document.getElementById('renderCvSoftSkillsSection'),
    renderCvLanguages: document.getElementById('renderCvLanguages'),
    renderCvLanguagesSection: document.getElementById('renderCvLanguagesSection'),
    renderCvExperienceTimeline: document.getElementById('renderCvExperienceTimeline'),
    renderCvEducationTimeline: document.getElementById('renderCvEducationTimeline'),
    renderCvCertTimeline: document.getElementById('renderCvCertTimeline'),
    renderCvCertSection: document.getElementById('renderCvCertSection'),
    renderCvAtsSkillsSection: document.getElementById('renderCvAtsSkillsSection'),
    renderCvAtsSkillsContent: document.getElementById('renderCvAtsSkillsContent'),
    renderCvAtsLangSection: document.getElementById('renderCvAtsLangSection'),
    renderCvAtsLangContent: document.getElementById('renderCvAtsLangContent'),

    // Viewport & Zoom
    btnZoomOut: document.getElementById('btnZoomOut'),
    btnZoomIn: document.getElementById('btnZoomIn'),
    btnFitWidth: document.getElementById('btnFitWidth'),
    zoomLabel: document.getElementById('zoomLabel'),
    paperViewport: document.getElementById('paperViewport'),

    // Modals
    modalSignPad: document.getElementById('modalSignPad'),
    btnCloseSignPad: document.getElementById('btnCloseSignPad'),
    btnCancelSignPad: document.getElementById('btnCancelSignPad'),
    btnApplySignature: document.getElementById('btnApplySignature'),
    btnClearCanvas: document.getElementById('btnClearCanvas'),
    signCanvas: document.getElementById('signCanvas'),
    modalDrafts: document.getElementById('modalDrafts'),
    draftsModalTitle: document.getElementById('draftsModalTitle'),
    btnCloseDrafts: document.getElementById('btnCloseDrafts'),
    btnCloseDraftsBtn: document.getElementById('btnCloseDraftsBtn'),
    draftsListContainer: document.getElementById('draftsListContainer'),
    toastContainer: document.getElementById('toastContainer')
  };
}

let ctx = null;

/**
 * ==============================================================================
 * INITIALIZATION
 * ==============================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  cacheDomElements();
  initDateInput();
  initSignatureCanvas();
  initEventListeners();
  initCvEventListeners();

  // Load default template or autosave
  loadLetterAutosaveOrPreset('undangan_rapat');
  loadCvAutosaveOrPreset('software_engineer');

  updateDraftsBadge();
  generateVerifiableQr();
});

function initDateInput() {
  const today = new Date().toISOString().split('T')[0];
  DOM.inputTanggalSurat.value = today;
}

function formatIndonesianDate(dateStr, cityName) {
  if (!dateStr) return cityName ? `${cityName}, -` : '-';
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  const parts = dateStr.split('-');
  if (parts.length !== 3) return `${cityName ? cityName + ', ' : ''}${dateStr}`;
  const year = parts[0];
  const month = months[parseInt(parts[1], 10) - 1] || parts[1];
  const day = parseInt(parts[2], 10);
  const formatted = `${day} ${month} ${year}`;
  return cityName ? `${cityName}, ${formatted}` : formatted;
}

/**
 * ==============================================================================
 * MODE SWITCHER: SURAT DIGITAL VS CV MAKER
 * ==============================================================================
 */
function setAppMode(mode) {
  state.activeMode = mode;

  if (mode === 'letter') {
    DOM.btnModeLetter.classList.add('active');
    DOM.btnModeCv.classList.remove('active');
    DOM.letterEditorPanel.style.display = 'flex';
    DOM.cvEditorPanel.style.display = 'none';
    DOM.letterPaper.style.display = 'flex';
    DOM.cvPaper.style.display = 'none';
    DOM.letterTemplateWrapper.style.display = 'block';
    DOM.cvTemplateWrapper.style.display = 'none';
    DOM.paperBadgeMode.textContent = 'Format Standar A4 Resmi (210 × 297 mm)';
    DOM.printBtnLabel.textContent = 'Cetak Surat / PDF';
    renderLetterPreview();
  } else {
    DOM.btnModeCv.classList.add('active');
    DOM.btnModeLetter.classList.remove('active');
    DOM.cvEditorPanel.style.display = 'flex';
    DOM.letterEditorPanel.style.display = 'none';
    DOM.cvPaper.style.display = 'flex';
    DOM.letterPaper.style.display = 'none';
    DOM.cvTemplateWrapper.style.display = 'block';
    DOM.letterTemplateWrapper.style.display = 'none';
    DOM.paperBadgeMode.textContent = 'Format Standar CV A4 (210 × 297 mm)';
    DOM.printBtnLabel.textContent = 'Cetak CV / PDF';
    renderCvPreview();
  }

  updateDraftsBadge();
}

/**
 * ==============================================================================
 * EVENT LISTENERS SETUP
 * ==============================================================================
 */
function initEventListeners() {
  // Mode Switcher Buttons
  DOM.btnModeLetter.addEventListener('click', () => setAppMode('letter'));
  DOM.btnModeCv.addEventListener('click', () => setAppMode('cv'));

  // Letter Tab Navigation
  document.querySelectorAll('#letterEditorPanel .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#letterEditorPanel .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('#letterEditorPanel .tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const targetTab = document.getElementById(btn.getAttribute('data-tab'));
      if (targetTab) targetTab.classList.add('active');
    });
  });

  // CV Tab Navigation
  document.querySelectorAll('#cvEditorPanel .cv-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#cvEditorPanel .cv-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('#cvEditorPanel .cv-tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const targetTab = document.getElementById(btn.getAttribute('data-tab'));
      if (targetTab) targetTab.classList.add('active');
    });
  });

  // Letter Reactive Input Binding
  const letterInputs = [
    DOM.inputInstansiNama, DOM.inputInstansiSub, DOM.inputInstansiAlamat,
    DOM.inputInstansiKontak, DOM.inputInstansiEmailWeb, DOM.inputKotaSurat,
    DOM.inputTanggalSurat, DOM.inputNomorSurat, DOM.inputLampiran,
    DOM.inputPerihal, DOM.inputPenerimaSapaan, DOM.inputPenerimaNama,
    DOM.inputPenerimaInstansi, DOM.inputPenerimaAlamat, DOM.inputSalamPembuka,
    DOM.inputParagrafPembuka, DOM.inputIsiRincian, DOM.inputParagrafPenutup,
    DOM.inputSalamPenutup, DOM.inputTembusan, DOM.inputJabatanPengirim,
    DOM.inputNamaPengirim, DOM.inputNipPengirim
  ];

  letterInputs.forEach(input => {
    input.addEventListener('input', () => {
      renderLetterPreview();
      saveLetterAutosave();
    });
  });

  DOM.fontStyleSelect.addEventListener('change', () => {
    DOM.letterPaper.className = `a4-sheet ${DOM.fontStyleSelect.value}`;
    saveLetterAutosave();
  });

  DOM.toggleKopSurat.addEventListener('change', () => {
    const isChecked = DOM.toggleKopSurat.checked;
    DOM.kopSuratFields.style.display = isChecked ? 'flex' : 'none';
    DOM.letterKop.style.display = isChecked ? 'flex' : 'none';
    renderLetterPreview();
    saveLetterAutosave();
  });

  DOM.toggleQrCode.addEventListener('change', () => {
    DOM.renderQrBox.style.display = DOM.toggleQrCode.checked ? 'flex' : 'none';
    saveLetterAutosave();
  });

  DOM.templateSelectLetter.addEventListener('change', (e) => {
    const key = e.target.value;
    if (key && letterTemplates[key]) {
      applyLetterTemplate(letterTemplates[key]);
      showToast(`Template surat "${DOM.templateSelectLetter.options[DOM.templateSelectLetter.selectedIndex].text}" berhasil dimuat!`, 'info');
    }
  });

  // Letter Logo & Stamp
  DOM.btnUploadLogoTrigger.addEventListener('click', () => DOM.inputKopLogo.click());
  DOM.inputKopLogo.addEventListener('change', handleLogoUpload);
  DOM.btnRemoveLogo.addEventListener('click', removeLogo);

  DOM.btnUploadStampTrigger.addEventListener('click', () => DOM.inputUploadStamp.click());
  DOM.inputUploadStamp.addEventListener('change', handleStampUpload);
  DOM.btnRemoveStamp.addEventListener('click', removeStamp);

  DOM.inputUploadSign.addEventListener('change', handleSignatureUpload);
  DOM.btnClearSignature.addEventListener('click', clearSignature);

  // Global Actions
  DOM.btnSaveDraft.addEventListener('click', saveDraftPrompt);
  DOM.btnOpenDrafts.addEventListener('click', openDraftsModal);
  DOM.btnCloseDrafts.addEventListener('click', () => DOM.modalDrafts.close());
  DOM.btnCloseDraftsBtn.addEventListener('click', () => DOM.modalDrafts.close());

  DOM.btnCopyText.addEventListener('click', copyActiveDocumentText);
  DOM.btnDownloadDoc.addEventListener('click', downloadActiveDocumentAsDoc);
  DOM.btnPrintDoc.addEventListener('click', () => window.print());
  DOM.btnResetForm.addEventListener('click', resetLetterFormPrompt);

  // Zoom Controls
  DOM.btnZoomIn.addEventListener('click', () => adjustZoom(0.1));
  DOM.btnZoomOut.addEventListener('click', () => adjustZoom(-0.1));
  DOM.btnFitWidth.addEventListener('click', fitZoomToViewport);
}

/**
 * ==============================================================================
 * CV EVENT LISTENERS & DYNAMIC ITEM CONTROLLERS
 * ==============================================================================
 */
function initCvEventListeners() {
  const cvInputs = [
    DOM.inputCvFullName, DOM.inputCvHeadline, DOM.inputCvEmail,
    DOM.inputCvPhone, DOM.inputCvLocation, DOM.inputCvLinkedin,
    DOM.inputCvPortfolio, DOM.inputCvSummary, DOM.inputCvHardSkills,
    DOM.inputCvSoftSkills, DOM.inputCvLanguages
  ];

  cvInputs.forEach(input => {
    input.addEventListener('input', () => {
      renderCvPreview();
      saveCvAutosave();
    });
  });

  DOM.cvLayoutSelect.addEventListener('change', () => {
    applyCvLayout();
    renderCvPreview();
    saveCvAutosave();
  });

  DOM.cvFontSelect.addEventListener('change', () => {
    DOM.cvPaper.className = `a4-sheet cv-paper ${DOM.cvLayoutSelect.value} ${DOM.cvFontSelect.value}`;
    saveCvAutosave();
  });

  DOM.toggleCvPhoto.addEventListener('change', () => {
    const show = DOM.toggleCvPhoto.checked;
    DOM.cvPhotoUploadGroup.style.display = show ? 'flex' : 'none';
    DOM.renderCvAvatarContainer.style.display = show ? 'flex' : 'none';
    if (DOM.cvLayoutSelect.value === 'layout-ats') {
      DOM.renderCvAtsPhotoWrapper.style.display = show ? 'flex' : 'none';
    }
    renderCvPreview();
    saveCvAutosave();
  });

  // CV Color Pickers
  document.querySelectorAll('.cv-color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.cv-color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      const color = dot.getAttribute('data-color');
      setCvAccentColor(color);
      saveCvAutosave();
    });
  });

  // CV Photo Upload
  DOM.btnUploadCvPhoto.addEventListener('click', () => DOM.inputCvPhoto.click());
  DOM.inputCvPhoto.addEventListener('change', handleCvPhotoUpload);
  DOM.btnRemoveCvPhoto.addEventListener('click', removeCvPhoto);

  // CV Dynamic Add Buttons
  DOM.btnAddCvExperience.addEventListener('click', () => addCvExperienceItem());
  DOM.btnAddCvEducation.addEventListener('click', () => addCvEducationItem());
  DOM.btnAddCvCert.addEventListener('click', () => addCvCertItem());

  // CV Preset Data Templates (hanya mengganti isi data, TIDAK mengubah desain/layout)
  DOM.templateSelectCv.addEventListener('change', (e) => {
    const key = e.target.value;
    if (key && cvTemplates[key]) {
      applyPresetDataOnly(cvTemplates[key]);
      showToast(`Data contoh "${DOM.templateSelectCv.options[DOM.templateSelectCv.selectedIndex].text}" berhasil dimuat! Desain CV Anda tidak berubah.`, 'info');
    }
  });

  DOM.btnResetCvForm.addEventListener('click', resetCvFormPrompt);
}

function setCvAccentColor(hexColor) {
  state.cvAccentColor = hexColor;
  document.documentElement.style.setProperty('--cv-accent', hexColor);
  document.documentElement.style.setProperty('--cv-accent-light', hexColor + '18');
  document.documentElement.style.setProperty('--cv-accent-border', hexColor + '55');
}

function applyCvLayout() {
  const layout = DOM.cvLayoutSelect.value;
  DOM.cvPaper.className = `a4-sheet cv-paper ${layout} ${DOM.cvFontSelect.value}`;
  const isAts = layout === 'layout-ats';

  DOM.renderCvAtsContactBar.style.display = isAts ? 'flex' : 'none';
  DOM.renderCvAtsPhotoWrapper.style.display = (isAts && DOM.toggleCvPhoto.checked) ? 'flex' : 'none';
  DOM.renderCvAtsSkillsSection.style.display = isAts ? 'block' : 'none';
  DOM.renderCvAtsLangSection.style.display = isAts ? 'block' : 'none';
}

/**
 * ==============================================================================
 * DYNAMIC CV EXPERIENCE, EDUCATION & CERTIFICATE MANAGERS
 * ==============================================================================
 */
function addCvExperienceItem(data = null) {
  const id = data?.id || 'exp_' + Date.now();
  const item = {
    id,
    role: data?.role || '',
    company: data?.company || '',
    location: data?.location || '',
    period: data?.period || '',
    desc: data?.desc || ''
  };

  if (!data) state.cvExperiences.push(item);

  const card = document.createElement('div');
  card.className = 'dynamic-item-card';
  card.setAttribute('data-id', id);
  card.innerHTML = `
    <div class="dynamic-item-header">
      <span class="dynamic-item-badge">Pengalaman Kerja</span>
      <button type="button" class="btn btn-sm btn-text text-danger btn-remove-item">&times; Hapus</button>
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label>Posisi / Jabatan</label>
        <input type="text" class="form-control exp-role" placeholder="Senior Frontend Engineer" value="${escapeHtml(item.role)}">
      </div>
      <div class="form-group col">
        <label>Perusahaan / Organisasi</label>
        <input type="text" class="form-control exp-company" placeholder="PT Global Digital" value="${escapeHtml(item.company)}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label>Periode Waktu</label>
        <input type="text" class="form-control exp-period" placeholder="Jan 2023 - Sekarang" value="${escapeHtml(item.period)}">
      </div>
      <div class="form-group col">
        <label>Lokasi / Kota</label>
        <input type="text" class="form-control exp-location" placeholder="Jakarta (Hybrid)" value="${escapeHtml(item.location)}">
      </div>
    </div>
    <div class="form-group">
      <label>Deskripsi Tanggung Jawab & Pencapaian</label>
      <textarea class="form-control exp-desc" rows="3" placeholder="• Merancang arsitektur frontend web app...&#10;• Meningkatkan performa aplikasi hingga 40%...">${escapeHtml(item.desc)}</textarea>
    </div>
  `;

  // Attach input listeners
  const inputs = card.querySelectorAll('input, textarea');
  inputs.forEach(inp => {
    inp.addEventListener('input', () => {
      syncCvExperiencesFromDOM();
      renderCvPreview();
      saveCvAutosave();
    });
  });

  card.querySelector('.btn-remove-item').addEventListener('click', () => {
    card.remove();
    syncCvExperiencesFromDOM();
    renderCvPreview();
    saveCvAutosave();
  });

  DOM.cvExperienceList.appendChild(card);
  if (!data) {
    renderCvPreview();
    saveCvAutosave();
  }
}

function syncCvExperiencesFromDOM() {
  const cards = DOM.cvExperienceList.querySelectorAll('.dynamic-item-card');
  state.cvExperiences = Array.from(cards).map(card => ({
    id: card.getAttribute('data-id'),
    role: card.querySelector('.exp-role').value,
    company: card.querySelector('.exp-company').value,
    period: card.querySelector('.exp-period').value,
    location: card.querySelector('.exp-location').value,
    desc: card.querySelector('.exp-desc').value
  }));
}

function addCvEducationItem(data = null) {
  const id = data?.id || 'edu_' + Date.now();
  const item = {
    id,
    school: data?.school || '',
    degree: data?.degree || '',
    year: data?.year || '',
    gpa: data?.gpa || '',
    notes: data?.notes || ''
  };

  if (!data) state.cvEducations.push(item);

  const card = document.createElement('div');
  card.className = 'dynamic-item-card';
  card.setAttribute('data-id', id);
  card.innerHTML = `
    <div class="dynamic-item-header">
      <span class="dynamic-item-badge">Pendidikan</span>
      <button type="button" class="btn btn-sm btn-text text-danger btn-remove-item">&times; Hapus</button>
    </div>
    <div class="form-group">
      <label>Nama Universitas / Sekolah</label>
      <input type="text" class="form-control edu-school" placeholder="Universitas Indonesia" value="${escapeHtml(item.school)}">
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label>Gelar & Jurusan</label>
        <input type="text" class="form-control edu-degree" placeholder="S1 Teknik Informatika" value="${escapeHtml(item.degree)}">
      </div>
      <div class="form-group col">
        <label>Tahun Kelulusan / Periode</label>
        <input type="text" class="form-control edu-year" placeholder="2018 - 2022" value="${escapeHtml(item.year)}">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label>Nilai / IPK (Opsional)</label>
        <input type="text" class="form-control edu-gpa" placeholder="IPK: 3.85 / 4.00" value="${escapeHtml(item.gpa)}">
      </div>
      <div class="form-group col">
        <label>Catatan / Organisasi (Opsional)</label>
        <input type="text" class="form-control edu-notes" placeholder="Cumlaude / Anggota BEM" value="${escapeHtml(item.notes)}">
      </div>
    </div>
  `;

  const inputs = card.querySelectorAll('input');
  inputs.forEach(inp => {
    inp.addEventListener('input', () => {
      syncCvEducationsFromDOM();
      renderCvPreview();
      saveCvAutosave();
    });
  });

  card.querySelector('.btn-remove-item').addEventListener('click', () => {
    card.remove();
    syncCvEducationsFromDOM();
    renderCvPreview();
    saveCvAutosave();
  });

  DOM.cvEducationList.appendChild(card);
  if (!data) {
    renderCvPreview();
    saveCvAutosave();
  }
}

function syncCvEducationsFromDOM() {
  const cards = DOM.cvEducationList.querySelectorAll('.dynamic-item-card');
  state.cvEducations = Array.from(cards).map(card => ({
    id: card.getAttribute('data-id'),
    school: card.querySelector('.edu-school').value,
    degree: card.querySelector('.edu-degree').value,
    year: card.querySelector('.edu-year').value,
    gpa: card.querySelector('.edu-gpa').value,
    notes: card.querySelector('.edu-notes').value
  }));
}

function addCvCertItem(data = null) {
  const id = data?.id || 'cert_' + Date.now();
  const item = {
    id,
    name: data?.name || '',
    issuer: data?.issuer || '',
    year: data?.year || ''
  };

  if (!data) state.cvCertifications.push(item);

  const card = document.createElement('div');
  card.className = 'dynamic-item-card';
  card.setAttribute('data-id', id);
  card.innerHTML = `
    <div class="dynamic-item-header">
      <span class="dynamic-item-badge">Sertifikasi</span>
      <button type="button" class="btn btn-sm btn-text text-danger btn-remove-item">&times; Hapus</button>
    </div>
    <div class="form-group">
      <label>Nama Sertifikat / Lisensi</label>
      <input type="text" class="form-control cert-name" placeholder="AWS Certified Solutions Architect" value="${escapeHtml(item.name)}">
    </div>
    <div class="form-row">
      <div class="form-group col">
        <label>Lembaga Penerbit</label>
        <input type="text" class="form-control cert-issuer" placeholder="Amazon Web Services" value="${escapeHtml(item.issuer)}">
      </div>
      <div class="form-group col">
        <label>Tahun Terbit</label>
        <input type="text" class="form-control cert-year" placeholder="2024" value="${escapeHtml(item.year)}">
      </div>
    </div>
  `;

  const inputs = card.querySelectorAll('input');
  inputs.forEach(inp => {
    inp.addEventListener('input', () => {
      syncCvCertsFromDOM();
      renderCvPreview();
      saveCvAutosave();
    });
  });

  card.querySelector('.btn-remove-item').addEventListener('click', () => {
    card.remove();
    syncCvCertsFromDOM();
    renderCvPreview();
    saveCvAutosave();
  });

  DOM.cvCertList.appendChild(card);
  if (!data) {
    renderCvPreview();
    saveCvAutosave();
  }
}

function syncCvCertsFromDOM() {
  const cards = DOM.cvCertList.querySelectorAll('.dynamic-item-card');
  state.cvCertifications = Array.from(cards).map(card => ({
    id: card.getAttribute('data-id'),
    name: card.querySelector('.cert-name').value,
    issuer: card.querySelector('.cert-issuer').value,
    year: card.querySelector('.cert-year').value
  }));
}

/**
 * ==============================================================================
 * CV REAL-TIME RENDERING LOGIC
 * ==============================================================================
 */
function renderCvPreview() {
  const isAts = DOM.cvLayoutSelect.value === 'layout-ats';
  const showPhoto = DOM.toggleCvPhoto.checked;

  // 1. Header Info
  const fullName = DOM.inputCvFullName.value || 'Nama Lengkap';
  const headline = DOM.inputCvHeadline.value || 'Gelar / Headline Profesi';
  DOM.renderCvFullName.textContent = fullName;
  DOM.renderCvHeadline.textContent = headline;

  // Avatar Initials
  const initials = fullName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  DOM.renderCvAvatarPlaceholder.textContent = initials || 'CV';

  // ATS Header Photo (Right side, optional)
  if (isAts && showPhoto) {
    DOM.renderCvAtsPhotoWrapper.style.display = 'flex';
    if (state.cvPhotoDataUrl) {
      DOM.renderCvAtsPhotoImg.src = state.cvPhotoDataUrl;
      DOM.renderCvAtsPhotoImg.style.display = 'block';
      DOM.renderCvAtsPhotoPlaceholder.style.display = 'none';
    } else {
      DOM.renderCvAtsPhotoImg.src = '';
      DOM.renderCvAtsPhotoImg.style.display = 'none';
      DOM.renderCvAtsPhotoPlaceholder.textContent = initials || 'FOTO';
      DOM.renderCvAtsPhotoPlaceholder.style.display = 'block';
    }
  } else {
    DOM.renderCvAtsPhotoWrapper.style.display = 'none';
  }

  // 2. Contact details
  const email = DOM.inputCvEmail.value.trim();
  const phone = DOM.inputCvPhone.value.trim();
  const loc = DOM.inputCvLocation.value.trim();
  const linkedin = DOM.inputCvLinkedin.value.trim();
  const portfolio = DOM.inputCvPortfolio.value.trim();

  DOM.renderCvEmail.textContent = email || '-';
  DOM.renderCvPhone.textContent = phone || '-';
  DOM.renderCvLocation.textContent = loc || '-';
  DOM.renderCvLinkedin.textContent = linkedin || '-';
  DOM.renderCvPortfolio.textContent = portfolio || '-';

  DOM.cvContactEmailRow.style.display = email ? 'flex' : 'none';
  DOM.cvContactPhoneRow.style.display = phone ? 'flex' : 'none';
  DOM.cvContactLocRow.style.display = loc ? 'flex' : 'none';
  DOM.cvContactLinkedinRow.style.display = linkedin ? 'flex' : 'none';
  DOM.cvContactPortoRow.style.display = portfolio ? 'flex' : 'none';

  // ATS Contact Bar (Text-based, with clean pipe separator)
  const contactParts = [];
  if (email) contactParts.push(`<span class="ats-contact-item">${escapeHtml(email)}</span>`);
  if (phone) contactParts.push(`<span class="ats-contact-item">${escapeHtml(phone)}</span>`);
  if (loc) contactParts.push(`<span class="ats-contact-item">${escapeHtml(loc)}</span>`);
  if (linkedin) contactParts.push(`<span class="ats-contact-item">${escapeHtml(linkedin)}</span>`);
  if (portfolio) contactParts.push(`<span class="ats-contact-item">${escapeHtml(portfolio)}</span>`);

  DOM.renderCvAtsContactBar.innerHTML = contactParts.join(' <span class="ats-sep">|</span> ');

  // 3. Summary
  DOM.renderCvSummary.textContent = DOM.inputCvSummary.value || 'Tuliskan ringkasan profesional Anda di formulir...';

  // 4. Skills Cloud (Sidebar) & ATS Skills Section (Main)
  const hardSkills = DOM.inputCvHardSkills.value.split(',').map(s => s.trim()).filter(Boolean);
  if (hardSkills.length > 0) {
    DOM.renderCvHardSkills.innerHTML = hardSkills.map(skill => `<span class="cv-skill-pill">${escapeHtml(skill)}</span>`).join('');
  } else {
    DOM.renderCvHardSkills.innerHTML = '<span class="text-muted" style="font-size:8pt;">Belum ada keahlian</span>';
  }

  const softSkills = DOM.inputCvSoftSkills.value.split(',').map(s => s.trim()).filter(Boolean);
  if (softSkills.length > 0) {
    DOM.renderCvSoftSkillsSection.style.display = 'block';
    DOM.renderCvSoftSkills.innerHTML = softSkills.map(skill => `<span class="cv-skill-pill">${escapeHtml(skill)}</span>`).join('');
  } else {
    DOM.renderCvSoftSkillsSection.style.display = 'none';
  }

  // ATS Inline Skills (Natural comma separation)
  let atsSkillsHtml = '';
  if (hardSkills.length > 0) {
    atsSkillsHtml += `<div class="cv-ats-skill-row"><strong class="cv-ats-skill-label">Keahlian Teknis:</strong><span class="cv-ats-skill-list">${hardSkills.map(s => escapeHtml(s)).join(', ')}</span></div>`;
  }
  if (softSkills.length > 0) {
    atsSkillsHtml += `<div class="cv-ats-skill-row"><strong class="cv-ats-skill-label">Soft Skills:</strong><span class="cv-ats-skill-list">${softSkills.map(s => escapeHtml(s)).join(', ')}</span></div>`;
  }
  if (hardSkills.length > 0 || softSkills.length > 0) {
    DOM.renderCvAtsSkillsContent.innerHTML = atsSkillsHtml;
    DOM.renderCvAtsSkillsSection.style.display = isAts ? 'block' : 'none';
  } else {
    DOM.renderCvAtsSkillsSection.style.display = 'none';
  }

  // 5. Languages (Sidebar & ATS)
  const languages = DOM.inputCvLanguages.value.split('\n').map(l => l.trim()).filter(Boolean);
  if (languages.length > 0) {
    DOM.renderCvLanguagesSection.style.display = 'block';
    DOM.renderCvLanguages.innerHTML = languages.map(line => {
      const match = line.match(/^(.*?)\s*[-—–]\s*(.*)$/);
      const name = match ? match[1].trim() : line;
      const level = match ? match[2].trim() : '';
      return `
        <div class="cv-lang-item">
          <span class="cv-lang-name">${escapeHtml(name)}</span>
          ${level ? `<span class="cv-lang-level">${escapeHtml(level)}</span>` : ''}
        </div>
      `;
    }).join('');

    // ATS Languages: Rendered on separate lines with clean ' — ' dash
    const langItemsHtml = languages.map(line => {
      const match = line.match(/^(.*?)\s*[-—–]\s*(.*)$/);
      if (match) {
        const name = match[1].trim();
        const level = match[2].trim();
        return `<div class="cv-ats-lang-item">${escapeHtml(name)}${level ? ` — ${escapeHtml(level)}` : ''}</div>`;
      }
      return `<div class="cv-ats-lang-item">${escapeHtml(line)}</div>`;
    }).join('');
    DOM.renderCvAtsLangContent.innerHTML = langItemsHtml;
    DOM.renderCvAtsLangSection.style.display = isAts ? 'block' : 'none';
  } else {
    DOM.renderCvLanguagesSection.style.display = 'none';
    DOM.renderCvAtsLangSection.style.display = 'none';
  }

  // 6. Experience Timeline (Bullets reserved for achievements/job descriptions)
  syncCvExperiencesFromDOM();
  if (state.cvExperiences.length > 0) {
    DOM.renderCvExperienceTimeline.innerHTML = state.cvExperiences.map(exp => {
      const descLines = (exp.desc || '').split('\n').map(l => l.trim()).filter(Boolean);
      const descHtml = descLines.length > 0 ? `
        <ul class="cv-ats-bullets">
          ${descLines.map(line => `<li>${escapeHtml(line.replace(/^[•\-\*]\s*/, ''))}</li>`).join('')}
        </ul>
      ` : '';

      return `
        <div class="cv-timeline-item">
          <div class="timeline-item-header">
            <span class="timeline-role">${escapeHtml(exp.role || 'Posisi Jabatan')}</span>
            <span class="timeline-period">${escapeHtml(exp.period || '')}</span>
          </div>
          <div class="timeline-company">${escapeHtml(exp.company || '')}${exp.company && exp.location ? ', ' : ''}${escapeHtml(exp.location || '')}</div>
          ${descHtml}
        </div>
      `;
    }).join('');
  } else {
    DOM.renderCvExperienceTimeline.innerHTML = '<p class="text-muted" style="font-size:9pt;">Klik "+ Tambah Pengalaman" pada editor untuk menambahkan riwayat karir.</p>';
  }

  // 7. Education Timeline (Clear separation of IPK and Organisasi)
  syncCvEducationsFromDOM();
  if (state.cvEducations.length > 0) {
    DOM.renderCvEducationTimeline.innerHTML = state.cvEducations.map(edu => `
      <div class="cv-timeline-item">
        <div class="timeline-item-header">
          <span class="timeline-role">${escapeHtml(edu.school || 'Nama Institusi')}</span>
          <span class="timeline-period">${escapeHtml(edu.year || '')}</span>
        </div>
        <div class="timeline-company">${escapeHtml(edu.degree || '')}</div>
        ${(edu.gpa || edu.notes) ? `<div class="timeline-desc">${edu.gpa ? `<div class="edu-gpa">${escapeHtml(edu.gpa)}</div>` : ''}${edu.notes ? `<div class="edu-notes">${escapeHtml(edu.notes)}</div>` : ''}</div>` : ''}
      </div>
    `).join('');
  } else {
    DOM.renderCvEducationTimeline.innerHTML = '<p class="text-muted" style="font-size:9pt;">Klik "+ Tambah Pendidikan" untuk menambahkan riwayat pendidikan.</p>';
  }

  // 8. Certifications
  syncCvCertsFromDOM();
  if (state.cvCertifications.length > 0) {
    DOM.renderCvCertSection.style.display = 'block';
    DOM.renderCvCertTimeline.innerHTML = state.cvCertifications.map(cert => `
      <div class="cv-cert-item">
        <div class="cv-cert-info">
          <span class="cv-cert-name">${escapeHtml(cert.name)}</span>
          ${cert.issuer ? `<span class="cv-cert-issuer"> — ${escapeHtml(cert.issuer)}</span>` : ''}
        </div>
        <span class="cv-cert-year">${escapeHtml(cert.year || '')}</span>
      </div>
    `).join('');
  } else {
    DOM.renderCvCertSection.style.display = 'none';
  }
}

function handleCvPhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    state.cvPhotoDataUrl = event.target.result;
    DOM.renderCvAvatarImg.src = state.cvPhotoDataUrl;
    DOM.renderCvAvatarImg.style.display = 'block';
    DOM.renderCvAvatarPlaceholder.style.display = 'none';

    DOM.renderCvAtsPhotoImg.src = state.cvPhotoDataUrl;
    DOM.renderCvAtsPhotoImg.style.display = 'block';
    DOM.renderCvAtsPhotoPlaceholder.style.display = 'none';

    DOM.btnRemoveCvPhoto.style.display = 'inline-block';
    DOM.btnUploadCvPhoto.textContent = 'Ganti Foto';
    renderCvPreview();
    saveCvAutosave();
    showToast('Foto profil CV berhasil diperbarui!', 'success');
  };
  reader.readAsDataURL(file);
}

function removeCvPhoto() {
  state.cvPhotoDataUrl = null;
  DOM.inputCvPhoto.value = '';
  DOM.renderCvAvatarImg.src = '';
  DOM.renderCvAvatarImg.style.display = 'none';
  DOM.renderCvAvatarPlaceholder.style.display = 'block';

  DOM.renderCvAtsPhotoImg.src = '';
  DOM.renderCvAtsPhotoImg.style.display = 'none';
  DOM.renderCvAtsPhotoPlaceholder.style.display = 'block';

  DOM.btnRemoveCvPhoto.style.display = 'none';
  DOM.btnUploadCvPhoto.textContent = 'Pilih Foto';
  renderCvPreview();
  saveCvAutosave();
}

/**
 * ==============================================================================
 * APPLY PRESET DATA ONLY (tidak mengubah desain/layout/warna/font)
 * Dipanggil ketika user memilih contoh data dari dropdown header.
 * Hanya mengganti: nama, headline, email, phone, lokasi, linkedin, portfolio,
 * summary, hardSkills, softSkills, languages, experiences, educations, certifications.
 * TIDAK mengubah: layout, font, accentColor, showPhoto toggle.
 * ==============================================================================
 */
function applyPresetDataOnly(tmpl) {
  // --- Isi Data Pribadi & Kontak (TIDAK ubah layout/font/warna) ---
  DOM.inputCvFullName.value = tmpl.fullName || '';
  DOM.inputCvHeadline.value = tmpl.headline || '';
  DOM.inputCvEmail.value = tmpl.email || '';
  DOM.inputCvPhone.value = tmpl.phone || '';
  DOM.inputCvLocation.value = tmpl.location || '';
  DOM.inputCvLinkedin.value = tmpl.linkedin || '';
  DOM.inputCvPortfolio.value = tmpl.portfolio || '';
  DOM.inputCvSummary.value = tmpl.summary || '';
  DOM.inputCvHardSkills.value = tmpl.hardSkills || '';
  DOM.inputCvSoftSkills.value = tmpl.softSkills || '';
  DOM.inputCvLanguages.value = tmpl.languages || '';

  // --- Dynamic Sections: Pengalaman Kerja ---
  DOM.cvExperienceList.innerHTML = '';
  state.cvExperiences = [];
  (tmpl.experiences || []).forEach(exp => addCvExperienceItem(exp));

  // --- Dynamic Sections: Pendidikan ---
  DOM.cvEducationList.innerHTML = '';
  state.cvEducations = [];
  (tmpl.educations || []).forEach(edu => addCvEducationItem(edu));

  // --- Dynamic Sections: Sertifikasi ---
  DOM.cvCertList.innerHTML = '';
  state.cvCertifications = [];
  (tmpl.certifications || []).forEach(cert => addCvCertItem(cert));

  // Re-render dan simpan (layout/font/warna/foto TIDAK berubah)
  renderCvPreview();
  saveCvAutosave();
}

function applyCvTemplate(tmpl) {
  DOM.cvLayoutSelect.value = tmpl.layout || 'layout-sidebar';
  DOM.cvFontSelect.value = tmpl.font || 'font-sans';
  applyCvLayout();

  setCvAccentColor(tmpl.accentColor || '#1e40af');
  document.querySelectorAll('.cv-color-dot').forEach(d => {
    d.classList.toggle('active', d.getAttribute('data-color') === tmpl.accentColor);
  });

  DOM.toggleCvPhoto.checked = tmpl.showPhoto !== false;
  DOM.cvPhotoUploadGroup.style.display = DOM.toggleCvPhoto.checked ? 'flex' : 'none';
  DOM.renderCvAvatarContainer.style.display = DOM.toggleCvPhoto.checked ? 'flex' : 'none';
  if (DOM.cvLayoutSelect.value === 'layout-ats') {
    DOM.renderCvAtsPhotoWrapper.style.display = DOM.toggleCvPhoto.checked ? 'flex' : 'none';
  }

  DOM.inputCvFullName.value = tmpl.fullName || '';
  DOM.inputCvHeadline.value = tmpl.headline || '';
  DOM.inputCvEmail.value = tmpl.email || '';
  DOM.inputCvPhone.value = tmpl.phone || '';
  DOM.inputCvLocation.value = tmpl.location || '';
  DOM.inputCvLinkedin.value = tmpl.linkedin || '';
  DOM.inputCvPortfolio.value = tmpl.portfolio || '';
  DOM.inputCvSummary.value = tmpl.summary || '';
  DOM.inputCvHardSkills.value = tmpl.hardSkills || '';
  DOM.inputCvSoftSkills.value = tmpl.softSkills || '';
  DOM.inputCvLanguages.value = tmpl.languages || '';

  // Render Experiences
  DOM.cvExperienceList.innerHTML = '';
  state.cvExperiences = [];
  (tmpl.experiences || []).forEach(exp => addCvExperienceItem(exp));

  // Render Educations
  DOM.cvEducationList.innerHTML = '';
  state.cvEducations = [];
  (tmpl.educations || []).forEach(edu => addCvEducationItem(edu));

  // Render Certifications
  DOM.cvCertList.innerHTML = '';
  state.cvCertifications = [];
  (tmpl.certifications || []).forEach(cert => addCvCertItem(cert));

  renderCvPreview();
  saveCvAutosave();
}

function resetCvFormPrompt() {
  if (confirm('Kembalikan data formulir CV ke template Software Engineer standar?')) {
    applyCvTemplate(cvTemplates.software_engineer);
    removeCvPhoto();
    showToast('Formulir CV berhasil direset ke standar.', 'info');
  }
}

/**
 * ==============================================================================
 * LETTER LIVE RENDERING LOGIC
 * ==============================================================================
 */
function renderLetterPreview() {
  DOM.renderInstansiNama.textContent = DOM.inputInstansiNama.value || 'NAMA INSTANSI / PERUSAHAAN';
  DOM.renderInstansiSub.textContent = DOM.inputInstansiSub.value || '';
  DOM.renderInstansiSub.style.display = DOM.inputInstansiSub.value ? 'block' : 'none';
  DOM.renderInstansiAlamat.textContent = DOM.inputInstansiAlamat.value || '';
  DOM.renderInstansiKontak.textContent = DOM.inputInstansiKontak.value || '';
  DOM.renderInstansiEmailWeb.textContent = DOM.inputInstansiEmailWeb.value || '';
  DOM.renderKopSep.style.display = (DOM.inputInstansiKontak.value && DOM.inputInstansiEmailWeb.value) ? 'inline' : 'none';

  const city = DOM.inputKotaSurat.value.trim();
  const dateVal = DOM.inputTanggalSurat.value;
  DOM.renderTanggalSurat.textContent = formatIndonesianDate(dateVal, city);

  DOM.renderNomorSurat.textContent = DOM.inputNomorSurat.value || '-';
  DOM.renderLampiran.textContent = DOM.inputLampiran.value || '-';
  DOM.renderPerihal.textContent = DOM.inputPerihal.value || '-';

  DOM.rowNomorSurat.style.display = DOM.inputNomorSurat.value && DOM.inputNomorSurat.value !== '-' ? 'table-row' : (DOM.toggleKopSurat.checked ? 'table-row' : 'none');
  DOM.rowLampiran.style.display = DOM.inputLampiran.value && DOM.inputLampiran.value !== '-' ? 'table-row' : 'none';
  DOM.rowPerihal.style.display = DOM.inputPerihal.value ? 'table-row' : 'none';

  DOM.renderPenerimaSapaan.textContent = DOM.inputPenerimaSapaan.value || 'Kepada Yth.';
  DOM.renderPenerimaNama.textContent = DOM.inputPenerimaNama.value || '';
  DOM.renderPenerimaNama.style.display = DOM.inputPenerimaNama.value ? 'block' : 'none';
  DOM.renderPenerimaInstansi.textContent = DOM.inputPenerimaInstansi.value || '';
  DOM.renderPenerimaInstansi.style.display = DOM.inputPenerimaInstansi.value ? 'block' : 'none';
  DOM.renderPenerimaAlamat.textContent = DOM.inputPenerimaAlamat.value || '';

  DOM.renderSalamPembuka.textContent = DOM.inputSalamPembuka.value || '';
  DOM.renderSalamPembuka.style.display = DOM.inputSalamPembuka.value ? 'block' : 'none';

  renderParagraphText(DOM.renderParagrafPembuka, DOM.inputParagrafPembuka.value);

  if (DOM.inputIsiRincian.value.trim()) {
    DOM.renderIsiRincianWrapper.style.display = 'block';
    DOM.renderIsiRincian.textContent = DOM.inputIsiRincian.value;
  } else {
    DOM.renderIsiRincianWrapper.style.display = 'none';
  }

  renderParagraphText(DOM.renderParagrafPenutup, DOM.inputParagrafPenutup.value);
  DOM.renderSalamPenutup.textContent = DOM.inputSalamPenutup.value || '';
  DOM.renderSalamPenutup.style.display = DOM.inputSalamPenutup.value ? 'block' : 'none';

  DOM.renderJabatanPengirim.textContent = DOM.inputJabatanPengirim.value || '';
  DOM.renderJabatanPengirim.style.display = DOM.inputJabatanPengirim.value ? 'block' : 'none';
  DOM.renderNamaPengirim.textContent = DOM.inputNamaPengirim.value || 'Nama Lengkap';
  DOM.renderNipPengirim.textContent = DOM.inputNipPengirim.value || '';
  DOM.renderNipPengirim.style.display = DOM.inputNipPengirim.value ? 'block' : 'none';

  const tembusanVal = DOM.inputTembusan.value.trim();
  if (tembusanVal) {
    DOM.renderTembusanWrapper.style.display = 'block';
    DOM.renderTembusanList.innerHTML = tembusanVal.split('\n').map(line => `<p>${escapeHtml(line)}</p>`).join('');
  } else {
    DOM.renderTembusanWrapper.style.display = 'none';
  }

  generateVerifiableQr();
}

function renderParagraphText(container, rawText) {
  if (!rawText) {
    container.textContent = '';
    container.style.display = 'none';
    return;
  }
  container.style.display = 'block';
  container.innerHTML = rawText.split('\n\n').map(p => escapeHtml(p).replace(/\n/g, '<br>')).join('<br><br>');
}

function escapeHtml(text) {
  if (!text) return '';
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function applyLetterTemplate(tmpl) {
  DOM.toggleKopSurat.checked = tmpl.useKop;
  DOM.kopSuratFields.style.display = tmpl.useKop ? 'flex' : 'none';
  DOM.letterKop.style.display = tmpl.useKop ? 'flex' : 'none';

  DOM.fontStyleSelect.value = tmpl.fontStyle || 'font-serif-formal';
  DOM.letterPaper.className = `a4-sheet ${DOM.fontStyleSelect.value}`;

  DOM.inputInstansiNama.value = tmpl.instansiNama || '';
  DOM.inputInstansiSub.value = tmpl.instansiSub || '';
  DOM.inputInstansiAlamat.value = tmpl.instansiAlamat || '';
  DOM.inputInstansiKontak.value = tmpl.instansiKontak || '';
  DOM.inputInstansiEmailWeb.value = tmpl.instansiEmailWeb || '';

  DOM.inputKotaSurat.value = tmpl.kotaSurat || 'Jakarta';
  DOM.inputTanggalSurat.value = tmpl.tanggalSurat || new Date().toISOString().split('T')[0];
  DOM.inputNomorSurat.value = tmpl.nomorSurat || '';
  DOM.inputLampiran.value = tmpl.lampiran || '-';
  DOM.inputPerihal.value = tmpl.perihal || '';

  DOM.inputPenerimaSapaan.value = tmpl.penerimaSapaan || 'Kepada Yth.';
  DOM.inputPenerimaNama.value = tmpl.penerimaNama || '';
  DOM.inputPenerimaInstansi.value = tmpl.penerimaInstansi || '';
  DOM.inputPenerimaAlamat.value = tmpl.penerimaAlamat || 'di Tempat';

  DOM.inputSalamPembuka.value = tmpl.salamPembuka || 'Dengan hormat,';
  DOM.inputParagrafPembuka.value = tmpl.paragrafPembuka || '';
  DOM.inputIsiRincian.value = tmpl.isiRincian || '';
  DOM.inputParagrafPenutup.value = tmpl.paragrafPenutup || '';
  DOM.inputSalamPenutup.value = tmpl.salamPenutup || 'Hormat kami,';

  DOM.inputJabatanPengirim.value = tmpl.jabatanPengirim || '';
  DOM.inputNamaPengirim.value = tmpl.namaPengirim || '';
  DOM.inputNipPengirim.value = tmpl.nipPengirim || '';
  DOM.inputTembusan.value = tmpl.tembusan || '';

  DOM.toggleQrCode.checked = tmpl.useQr !== false;
  DOM.renderQrBox.style.display = DOM.toggleQrCode.checked ? 'flex' : 'none';

  renderLetterPreview();
  saveLetterAutosave();
}

function resetLetterFormPrompt() {
  if (confirm('Kembalikan data formulir surat ke pengaturan awal?')) {
    applyLetterTemplate(letterTemplates.undangan_rapat);
    clearSignature();
    removeStamp();
    removeLogo();
    showToast('Formulir surat berhasil direset ke standar.', 'info');
  }
}

/**
 * ==============================================================================
 * DIGITAL SIGNATURE CANVAS PAD
 * ==============================================================================
 */
function initSignatureCanvas() {
  const canvas = DOM.signCanvas;
  ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  canvas.width = 560 * dpr;
  canvas.height = 240 * dpr;
  ctx.scale(dpr, dpr);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stopDrawing);

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', { clientX: touch.clientX, clientY: touch.clientY });
    canvas.dispatchEvent(mouseEvent);
  }, { passive: false });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', { clientX: touch.clientX, clientY: touch.clientY });
    canvas.dispatchEvent(mouseEvent);
  }, { passive: false });

  window.addEventListener('touchend', () => {
    const mouseEvent = new MouseEvent('mouseup', {});
    window.dispatchEvent(mouseEvent);
  });

  DOM.btnOpenSignPad.addEventListener('click', () => {
    DOM.modalSignPad.showModal();
    clearCanvasDrawing();
  });

  DOM.btnCloseSignPad.addEventListener('click', () => DOM.modalSignPad.close());
  DOM.btnCancelSignPad.addEventListener('click', () => DOM.modalSignPad.close());
  DOM.btnClearCanvas.addEventListener('click', clearCanvasDrawing);

  DOM.btnApplySignature.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL('image/png');
    setSignature(dataUrl);
    DOM.modalSignPad.close();
    showToast('Tanda tangan digital berhasil diterapkan!', 'success');
  });

  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      state.penColor = dot.getAttribute('data-color');
    });
  });

  document.querySelectorAll('.btn-tool-size').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-tool-size').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.penSize = parseFloat(btn.getAttribute('data-size'));
    });
  });
}

function getCanvasCoordinates(e) {
  const rect = DOM.signCanvas.getBoundingClientRect();
  const scaleX = 560 / rect.width;
  const scaleY = 240 / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY
  };
}

function startDrawing(e) {
  state.isDrawing = true;
  const coords = getCanvasCoordinates(e);
  state.lastX = coords.x;
  state.lastY = coords.y;
}

function draw(e) {
  if (!state.isDrawing) return;
  const coords = getCanvasCoordinates(e);
  ctx.strokeStyle = state.penColor;
  ctx.lineWidth = state.penSize;
  ctx.beginPath();
  ctx.moveTo(state.lastX, state.lastY);
  ctx.lineTo(coords.x, coords.y);
  ctx.stroke();
  state.lastX = coords.x;
  state.lastY = coords.y;
}

function stopDrawing() {
  state.isDrawing = false;
}

function clearCanvasDrawing() {
  ctx.clearRect(0, 0, 560, 240);
}

function setSignature(dataUrl) {
  state.letterSignatureDataUrl = dataUrl;
  DOM.imgSignPreview.src = dataUrl;
  DOM.imgSignPreview.style.display = 'block';
  DOM.signPreviewBox.querySelector('.sign-placeholder-text').style.display = 'none';
  DOM.btnClearSignature.style.display = 'inline-block';

  DOM.renderSignImg.src = dataUrl;
  DOM.renderSignImg.style.display = 'block';
  DOM.renderSignSpacing.style.display = 'none';
  saveLetterAutosave();
}

function clearSignature() {
  state.letterSignatureDataUrl = null;
  DOM.imgSignPreview.src = '';
  DOM.imgSignPreview.style.display = 'none';
  DOM.signPreviewBox.querySelector('.sign-placeholder-text').style.display = 'block';
  DOM.btnClearSignature.style.display = 'none';
  DOM.inputUploadSign.value = '';

  DOM.renderSignImg.src = '';
  DOM.renderSignImg.style.display = 'none';
  DOM.renderSignSpacing.style.display = 'block';
  saveLetterAutosave();
}

function handleSignatureUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    setSignature(event.target.result);
    showToast('Tanda tangan berhasil diunggah!', 'success');
  };
  reader.readAsDataURL(file);
}

function handleLogoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    state.letterLogoDataUrl = event.target.result;
    DOM.kopLogoImg.src = state.letterLogoDataUrl;
    DOM.kopLogoContainer.style.display = 'flex';
    DOM.btnRemoveLogo.style.display = 'inline-block';
    DOM.btnUploadLogoTrigger.textContent = 'Ganti Logo';
    saveLetterAutosave();
    showToast('Logo instansi berhasil dipasang!', 'success');
  };
  reader.readAsDataURL(file);
}

function removeLogo() {
  state.letterLogoDataUrl = null;
  DOM.inputKopLogo.value = '';
  DOM.kopLogoImg.src = '';
  DOM.kopLogoContainer.style.display = 'none';
  DOM.btnRemoveLogo.style.display = 'none';
  DOM.btnUploadLogoTrigger.textContent = 'Pilih File Logo';
  saveLetterAutosave();
}

function handleStampUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    state.letterStampDataUrl = event.target.result;
    DOM.renderStampImg.src = state.letterStampDataUrl;
    DOM.renderStampImg.style.display = 'block';
    DOM.btnRemoveStamp.style.display = 'inline-block';
    DOM.btnUploadStampTrigger.textContent = 'Ganti Cap';
    saveLetterAutosave();
    showToast('Cap stempel berhasil dipasang!', 'success');
  };
  reader.readAsDataURL(file);
}

function removeStamp() {
  state.letterStampDataUrl = null;
  DOM.inputUploadStamp.value = '';
  DOM.renderStampImg.src = '';
  DOM.renderStampImg.style.display = 'none';
  DOM.btnRemoveStamp.style.display = 'none';
  DOM.btnUploadStampTrigger.textContent = 'Pilih Cap Stempel';
  saveLetterAutosave();
}

function generateVerifiableQr() {
  const noSurat = DOM.inputNomorSurat.value || 'SURAT-001';
  const tglSurat = DOM.inputTanggalSurat.value || '2026-08-16';
  const pengirim = DOM.inputNamaPengirim.value || 'Pengirim';

  let hashVal = 0;
  const rawStr = `${noSurat}|${tglSurat}|${pengirim}`;
  for (let i = 0; i < rawStr.length; i++) {
    hashVal = ((hashVal << 5) - hashVal) + rawStr.charCodeAt(i);
    hashVal |= 0;
  }
  const hexHash = Math.abs(hashVal).toString(16).toUpperCase().padStart(8, '0');
  const docHash = `VAL-${hexHash.substring(0, 4)}-${hexHash.substring(4, 8)}`;
  DOM.renderDocHash.textContent = docHash;

  DOM.qrCodeContainer.innerHTML = renderQrSvg(rawStr, hashVal);
}

function renderQrSvg(seedStr, hash) {
  const size = 21;
  const grid = Array.from({ length: size }, () => Array(size).fill(0));

  function drawFinder(x, y) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          grid[y + r][x + c] = 1;
        }
      }
    }
  }
  drawFinder(0, 0);
  drawFinder(size - 7, 0);
  drawFinder(0, size - 7);

  for (let i = 8; i < size - 8; i++) {
    grid[6][i] = i % 2 === 0 ? 1 : 0;
    grid[i][6] = i % 2 === 0 ? 1 : 0;
  }

  let seed = Math.abs(hash);
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inTL = r < 8 && c < 8;
      const inTR = r < 8 && c >= size - 8;
      const inBL = r >= size - 8 && c < 8;
      if (!inTL && !inTR && !inBL && grid[r][c] === 0) {
        seed = (seed * 9301 + 49297) % 233280;
        grid[r][c] = (seed % 2 === 0) ? 1 : 0;
      }
    }
  }

  let rects = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === 1) {
        rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="#0f172a"/>`;
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges">${rects}</svg>`;
}

/**
 * ==============================================================================
 * LOCAL STORAGE & DRAFTS MANAGEMENT (SURAT & CV)
 * ==============================================================================
 */
function getLetterFormData() {
  return {
    useKop: DOM.toggleKopSurat.checked,
    fontStyle: DOM.fontStyleSelect.value,
    instansiNama: DOM.inputInstansiNama.value,
    instansiSub: DOM.inputInstansiSub.value,
    instansiAlamat: DOM.inputInstansiAlamat.value,
    instansiKontak: DOM.inputInstansiKontak.value,
    instansiEmailWeb: DOM.inputInstansiEmailWeb.value,
    kotaSurat: DOM.inputKotaSurat.value,
    tanggalSurat: DOM.inputTanggalSurat.value,
    nomorSurat: DOM.inputNomorSurat.value,
    lampiran: DOM.inputLampiran.value,
    perihal: DOM.inputPerihal.value,
    penerimaSapaan: DOM.inputPenerimaSapaan.value,
    penerimaNama: DOM.inputPenerimaNama.value,
    penerimaInstansi: DOM.inputPenerimaInstansi.value,
    penerimaAlamat: DOM.inputPenerimaAlamat.value,
    salamPembuka: DOM.inputSalamPembuka.value,
    paragrafPembuka: DOM.inputParagrafPembuka.value,
    isiRincian: DOM.inputIsiRincian.value,
    paragrafPenutup: DOM.inputParagrafPenutup.value,
    salamPenutup: DOM.inputSalamPenutup.value,
    jabatanPengirim: DOM.inputJabatanPengirim.value,
    namaPengirim: DOM.inputNamaPengirim.value,
    nipPengirim: DOM.inputNipPengirim.value,
    tembusan: DOM.inputTembusan.value,
    useQr: DOM.toggleQrCode.checked,
    signatureUrl: state.letterSignatureDataUrl,
    stampUrl: state.letterStampDataUrl,
    logoUrl: state.letterLogoDataUrl
  };
}

function loadLetterFormData(data) {
  applyLetterTemplate(data);
  if (data.signatureUrl) setSignature(data.signatureUrl);
  else clearSignature();

  if (data.stampUrl) {
    state.letterStampDataUrl = data.stampUrl;
    DOM.renderStampImg.src = data.stampUrl;
    DOM.renderStampImg.style.display = 'block';
    DOM.btnRemoveStamp.style.display = 'inline-block';
    DOM.btnUploadStampTrigger.textContent = 'Ganti Cap';
  } else {
    removeStamp();
  }

  if (data.logoUrl) {
    state.letterLogoDataUrl = data.logoUrl;
    DOM.kopLogoImg.src = data.logoUrl;
    DOM.kopLogoContainer.style.display = 'flex';
    DOM.btnRemoveLogo.style.display = 'inline-block';
    DOM.btnUploadLogoTrigger.textContent = 'Ganti Logo';
  } else {
    removeLogo();
  }
}

function getCvFormData() {
  syncCvExperiencesFromDOM();
  syncCvEducationsFromDOM();
  syncCvCertsFromDOM();

  return {
    layout: DOM.cvLayoutSelect.value,
    font: DOM.cvFontSelect.value,
    accentColor: state.cvAccentColor,
    showPhoto: DOM.toggleCvPhoto.checked,
    photoUrl: state.cvPhotoDataUrl,
    fullName: DOM.inputCvFullName.value,
    headline: DOM.inputCvHeadline.value,
    email: DOM.inputCvEmail.value,
    phone: DOM.inputCvPhone.value,
    location: DOM.inputCvLocation.value,
    linkedin: DOM.inputCvLinkedin.value,
    portfolio: DOM.inputCvPortfolio.value,
    summary: DOM.inputCvSummary.value,
    hardSkills: DOM.inputCvHardSkills.value,
    softSkills: DOM.inputCvSoftSkills.value,
    languages: DOM.inputCvLanguages.value,
    experiences: state.cvExperiences,
    educations: state.cvEducations,
    certifications: state.cvCertifications
  };
}

function loadCvFormData(data) {
  applyCvTemplate(data);
  if (data.photoUrl) {
    state.cvPhotoDataUrl = data.photoUrl;
    DOM.renderCvAvatarImg.src = data.photoUrl;
    DOM.renderCvAvatarImg.style.display = 'block';
    DOM.renderCvAvatarPlaceholder.style.display = 'none';

    DOM.renderCvAtsPhotoImg.src = data.photoUrl;
    DOM.renderCvAtsPhotoImg.style.display = 'block';
    DOM.renderCvAtsPhotoPlaceholder.style.display = 'none';

    DOM.btnRemoveCvPhoto.style.display = 'inline-block';
    DOM.btnUploadCvPhoto.textContent = 'Ganti Foto';
  } else {
    removeCvPhoto();
  }
}

function saveLetterAutosave() {
  try {
    localStorage.setItem('surat_digital_autosave', JSON.stringify(getLetterFormData()));
  } catch (e) {}
}

function loadLetterAutosaveOrPreset(defaultPresetKey) {
  try {
    const saved = localStorage.getItem('surat_digital_autosave');
    if (saved) {
      loadLetterFormData(JSON.parse(saved));
      return;
    }
  } catch (e) {}
  applyLetterTemplate(letterTemplates[defaultPresetKey]);
}

function saveCvAutosave() {
  try {
    localStorage.setItem('cv_digital_autosave', JSON.stringify(getCvFormData()));
  } catch (e) {}
}

function loadCvAutosaveOrPreset(defaultPresetKey) {
  try {
    const saved = localStorage.getItem('cv_digital_autosave');
    if (saved) {
      loadCvFormData(JSON.parse(saved));
      return;
    }
  } catch (e) {}
  applyCvTemplate(cvTemplates[defaultPresetKey]);
}

function getDraftsStorageKey() {
  return state.activeMode === 'cv' ? 'cv_digital_drafts' : 'surat_digital_drafts';
}

function getSavedDrafts() {
  try {
    const raw = localStorage.getItem(getDraftsStorageKey());
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function updateDraftsBadge() {
  const drafts = getSavedDrafts();
  DOM.draftCount.textContent = drafts.length;
}

function saveDraftPrompt() {
  const isCv = state.activeMode === 'cv';
  const defaultTitle = isCv 
    ? (DOM.inputCvFullName.value ? `CV - ${DOM.inputCvFullName.value}` : 'Draf CV')
    : (DOM.inputPerihal.value || 'Draf Surat');

  const title = prompt(`Masukkan nama untuk draf ${isCv ? 'CV' : 'Surat'} ini:`, defaultTitle);
  if (!title) return;

  const drafts = getSavedDrafts();
  const newDraft = {
    id: 'draft_' + Date.now(),
    type: state.activeMode,
    title: title.trim(),
    updatedAt: new Date().toLocaleString('id-ID'),
    data: isCv ? getCvFormData() : getLetterFormData()
  };

  drafts.unshift(newDraft);
  localStorage.setItem(getDraftsStorageKey(), JSON.stringify(drafts));
  updateDraftsBadge();
  showToast(`Draf "${title}" berhasil disimpan!`, 'success');
}

function openDraftsModal() {
  const isCv = state.activeMode === 'cv';
  DOM.draftsModalTitle.textContent = isCv ? 'Draf CV Tersimpan' : 'Draf Surat Tersimpan';
  renderDraftsList();
  DOM.modalDrafts.showModal();
}

function renderDraftsList() {
  const drafts = getSavedDrafts();
  const isCv = state.activeMode === 'cv';

  if (drafts.length === 0) {
    DOM.draftsListContainer.innerHTML = `
      <div class="empty-drafts-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 8px; color: #94a3b8;">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        </svg>
        <p>Belum ada draf ${isCv ? 'CV' : 'surat'} yang tersimpan.</p>
        <small>Klik tombol "Simpan Draf" di atas untuk menyimpan dokumen saat ini.</small>
      </div>
    `;
    return;
  }

  DOM.draftsListContainer.innerHTML = drafts.map(draft => `
    <div class="draft-item" data-id="${draft.id}">
      <div class="draft-info">
        <div class="draft-info-title">${escapeHtml(draft.title)}</div>
        <div class="draft-info-meta">Disimpan pada: ${draft.updatedAt}</div>
      </div>
      <div class="draft-actions">
        <button type="button" class="btn btn-sm btn-primary btn-load-draft" data-id="${draft.id}">Muat</button>
        <button type="button" class="btn btn-sm btn-outline text-danger btn-delete-draft" data-id="${draft.id}">Hapus</button>
      </div>
    </div>
  `).join('');

  DOM.draftsListContainer.querySelectorAll('.btn-load-draft').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const targetDraft = drafts.find(d => d.id === id);
      if (targetDraft) {
        if (state.activeMode === 'cv') {
          loadCvFormData(targetDraft.data);
        } else {
          loadLetterFormData(targetDraft.data);
        }
        DOM.modalDrafts.close();
        showToast(`Draf "${targetDraft.title}" berhasil dimuat!`, 'success');
      }
    });
  });

  DOM.draftsListContainer.querySelectorAll('.btn-delete-draft').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Hapus draf ini dari penyimpanan?')) {
        const filtered = drafts.filter(d => d.id !== id);
        localStorage.setItem(getDraftsStorageKey(), JSON.stringify(filtered));
        updateDraftsBadge();
        renderDraftsList();
        showToast('Draf berhasil dihapus.', 'info');
      }
    });
  });
}

/**
 * ==============================================================================
 * COPY PLAIN TEXT ACTION (SURAT & CV)
 * ==============================================================================
 */
function copyActiveDocumentText() {
  if (state.activeMode === 'cv') {
    copyCvToClipboard();
  } else {
    copyLetterToClipboard();
  }
}

function copyLetterToClipboard() {
  const d = getLetterFormData();
  const dateFormatted = formatIndonesianDate(d.tanggalSurat, d.kotaSurat);

  let plainText = '';
  if (d.useKop && d.instansiNama) {
    plainText += `${d.instansiNama}\n${d.instansiSub ? d.instansiSub + '\n' : ''}${d.instansiAlamat}\n${d.instansiKontak} | ${d.instansiEmailWeb}\n=======================================================\n\n`;
  }

  plainText += `Nomor    : ${d.nomorSurat}\n`;
  plainText += `Lampiran : ${d.lampiran}\n`;
  plainText += `Perihal  : ${d.perihal}\n\n`;
  plainText += `${dateFormatted}\n\n`;
  plainText += `${d.penerimaSapaan}\n`;
  if (d.penerimaNama) plainText += `${d.penerimaNama}\n`;
  if (d.penerimaInstansi) plainText += `${d.penerimaInstansi}\n`;
  plainText += `${d.penerimaAlamat}\n\n`;

  if (d.salamPembuka) plainText += `${d.salamPembuka}\n\n`;
  plainText += `${d.paragrafPembuka}\n\n`;

  if (d.isiRincian) plainText += `${d.isiRincian}\n\n`;
  plainText += `${d.paragrafPenutup}\n\n`;

  if (d.salamPenutup) plainText += `${d.salamPenutup}\n`;
  if (d.jabatanPengirim) plainText += `${d.jabatanPengirim}\n\n\n`;
  plainText += `( ${d.namaPengirim} )\n`;
  if (d.nipPengirim) plainText += `${d.nipPengirim}\n\n`;

  if (d.tembusan) {
    plainText += `Tembusan:\n${d.tembusan}\n`;
  }

  navigator.clipboard.writeText(plainText).then(() => {
    showToast('Teks surat berhasil disalin ke clipboard!', 'success');
  });
}

function copyCvToClipboard() {
  const d = getCvFormData();
  let text = `CURRICULUM VITAE\n=========================================\n`;
  text += `Nama       : ${d.fullName}\n`;
  text += `Profesi    : ${d.headline}\n`;
  text += `Email      : ${d.email} | Telp: ${d.phone}\n`;
  text += `Lokasi     : ${d.location}\n`;
  if (d.linkedin) text += `LinkedIn   : ${d.linkedin}\n`;
  if (d.portfolio) text += `Portofolio : ${d.portfolio}\n`;
  text += `\nRINGKASAN PROFESIONAL:\n${d.summary}\n\n`;

  text += `PENGALAMAN KERJA:\n`;
  d.experiences.forEach((exp, i) => {
    text += `${i + 1}. ${exp.role} - ${exp.company} (${exp.period})\n${exp.desc}\n\n`;
  });

  text += `RIWAYAT PENDIDIKAN:\n`;
  d.educations.forEach((edu, i) => {
    text += `${i + 1}. ${edu.school} (${edu.year})\n   ${edu.degree} ${edu.gpa ? `- ${edu.gpa}` : ''}\n\n`;
  });

  text += `KEAHLIAN UTAMA:\n${d.hardSkills}\n\n`;
  if (d.softSkills) text += `SOFT SKILLS:\n${d.softSkills}\n\n`;
  if (d.certifications.length > 0) {
    text += `SERTIFIKASI:\n`;
    d.certifications.forEach(c => text += `• ${c.name} - ${c.issuer} (${c.year})\n`);
    text += `\n`;
  }
  if (d.languages) text += `BAHASA:\n${d.languages}\n`;

  navigator.clipboard.writeText(text).then(() => {
    showToast('Teks CV berhasil disalin ke clipboard!', 'success');
  });
}

/**
 * ==============================================================================
 * EXPORT AS WORD DOCUMENT (.DOC)
 * ==============================================================================
 */
function downloadActiveDocumentAsDoc() {
  if (state.activeMode === 'cv') {
    downloadCvAsDoc();
  } else {
    downloadLetterAsDoc();
  }
}

function triggerBlobDownload(content, filename, mimeType = 'application/msword;charset=utf-8') {
  const blob = new Blob(['\ufeff' + content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadLetterAsDoc() {
  const d = getLetterFormData();
  const dateFormatted = formatIndonesianDate(d.tanggalSurat, d.kotaSurat);

  let kopHtml = '';
  if (d.useKop && d.instansiNama) {
    const logoHtml = d.logoUrl ? `<td width="90" style="vertical-align:middle; text-align:center;"><img src="${d.logoUrl}" width="75" height="75" style="display:block; margin:0 auto; object-fit:contain;" /></td>` : '';
    kopHtml = `
      <table style="width:100%; margin-bottom:6pt; border-collapse:collapse;">
        <tr>
          ${logoHtml}
          <td style="text-align:center; vertical-align:middle;">
            <div style="font-size:15pt; font-weight:bold; text-transform:uppercase; font-family:'Arial', sans-serif; letter-spacing:0.5pt; color:#0f172a;">${escapeHtml(d.instansiNama)}</div>
            ${d.instansiSub ? `<div style="font-size:11pt; font-weight:bold; color:#1e293b; margin-top:2pt;">${escapeHtml(d.instansiSub)}</div>` : ''}
            ${d.instansiAlamat ? `<div style="font-size:9.5pt; color:#334155; margin-top:2pt;">${escapeHtml(d.instansiAlamat)}</div>` : ''}
            <div style="font-size:9pt; color:#475569; margin-top:1pt;">
              ${escapeHtml(d.instansiKontak || '')} ${d.instansiKontak && d.instansiEmailWeb ? ' | ' : ''} ${escapeHtml(d.instansiEmailWeb || '')}
            </div>
          </td>
        </tr>
      </table>
      <div style="border-top:1pt solid #0f172a; border-bottom:2.5pt solid #0f172a; height:2pt; margin-bottom:16pt;"></div>
    `;
  }

  let rowsInfo = '';
  if (d.nomorSurat && d.nomorSurat !== '-') {
    rowsInfo += `<tr><td style="width:75pt; vertical-align:top; font-size:11pt; color:#334155;">Nomor</td><td style="width:12pt; vertical-align:top;">:</td><td style="vertical-align:top; font-size:11pt; font-weight:bold; color:#0f172a;">${escapeHtml(d.nomorSurat)}</td></tr>`;
  }
  if (d.lampiran && d.lampiran !== '-') {
    rowsInfo += `<tr><td style="vertical-align:top; font-size:11pt; color:#334155;">Lampiran</td><td style="vertical-align:top;">:</td><td style="vertical-align:top; font-size:11pt;">${escapeHtml(d.lampiran)}</td></tr>`;
  }
  if (d.perihal) {
    rowsInfo += `<tr><td style="vertical-align:top; font-size:11pt; color:#334155;">Perihal</td><td style="vertical-align:top;">:</td><td style="vertical-align:top; font-size:11pt; font-weight:bold; color:#0f172a;">${escapeHtml(d.perihal)}</td></tr>`;
  }

  const metaBlock = `
    <table style="width:100%; margin-bottom:16pt; border-collapse:collapse;">
      <tr>
        <td style="width:60%; vertical-align:top;">
          <table style="border-collapse:collapse;">
            ${rowsInfo}
          </table>
        </td>
        <td style="width:40%; text-align:right; vertical-align:top; font-size:11pt; color:#1e293b;">
          ${escapeHtml(dateFormatted)}
        </td>
      </tr>
    </table>
  `;

  const penerimaBlock = `
    <div style="margin-bottom:16pt; line-height:1.4; font-size:11pt;">
      <div>${escapeHtml(d.penerimaSapaan || 'Kepada Yth.')}</div>
      ${d.penerimaNama ? `<div style="font-weight:bold; color:#0f172a;">${escapeHtml(d.penerimaNama)}</div>` : ''}
      ${d.penerimaInstansi ? `<div>${escapeHtml(d.penerimaInstansi)}</div>` : ''}
      <div>${escapeHtml(d.penerimaAlamat || 'di Tempat')}</div>
    </div>
  `;

  const salamPembuka = d.salamPembuka ? `<p style="margin-bottom:10pt;">${escapeHtml(d.salamPembuka)}</p>` : '';
  const paragrafPembuka = d.paragrafPembuka ? `<p style="text-align:justify; text-indent:24pt; margin-bottom:10pt; line-height:1.5;">${escapeHtml(d.paragrafPembuka).replace(/\n\n/g, '</p><p style="text-align:justify; text-indent:24pt; margin-bottom:10pt; line-height:1.5;">').replace(/\n/g, '<br>')}</p>` : '';
  
  let isiRincianBlock = '';
  if (d.isiRincian) {
    isiRincianBlock = `
      <div style="margin: 10pt 0 12pt 24pt; font-family:'Courier New', monospace; font-size:10.5pt; line-height:1.45; white-space:pre-wrap; background:#f8fafc; padding:8pt 12pt; border-left:3pt solid #94a3b8;">${escapeHtml(d.isiRincian)}</div>
    `;
  }

  const paragrafPenutup = d.paragrafPenutup ? `<p style="text-align:justify; text-indent:24pt; margin-bottom:14pt; line-height:1.5;">${escapeHtml(d.paragrafPenutup).replace(/\n\n/g, '</p><p style="text-align:justify; text-indent:24pt; margin-bottom:14pt; line-height:1.5;">').replace(/\n/g, '<br>')}</p>` : '';

  let signatureImgHtml = '<div style="height:55pt;"></div>';
  if (d.signatureUrl) {
    signatureImgHtml = `<div style="height:55pt; text-align:center;"><img src="${d.signatureUrl}" style="height:50pt; max-width:140pt; object-fit:contain;" /></div>`;
  }

  const signBlock = `
    <table style="width:100%; margin-top:20pt; border-collapse:collapse;">
      <tr>
        <td style="width:50%; vertical-align:top;">
          ${d.tembusan ? `
            <div style="font-size:9.5pt; color:#334155; line-height:1.4;">
              <strong style="text-decoration:underline;">Tembusan:</strong><br>
              ${escapeHtml(d.tembusan).split('\n').map(t => escapeHtml(t)).join('<br>')}
            </div>
          ` : ''}
        </td>
        <td style="width:50%; text-align:center; vertical-align:top; font-size:11pt;">
          <div>${escapeHtml(d.salamPenutup || 'Hormat kami,')}</div>
          ${d.jabatanPengirim ? `<div style="font-size:10.5pt; color:#334155; margin-top:2pt;">${escapeHtml(d.jabatanPengirim)}</div>` : ''}
          ${signatureImgHtml}
          <div style="font-weight:bold; text-decoration:underline; color:#0f172a;">${escapeHtml(d.namaPengirim || '(......................................)')}</div>
          ${d.nipPengirim ? `<div style="font-size:10pt; color:#475569; margin-top:2pt;">${escapeHtml(d.nipPengirim)}</div>` : ''}
        </td>
      </tr>
    </table>
  `;

  const wordContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>${escapeHtml(d.perihal || 'Surat Resmi')}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 595.3pt 841.9pt;
      margin: 54pt 54pt 54pt 54pt;
      mso-header-margin: 35.4pt;
      mso-footer-margin: 35.4pt;
      mso-paper-source: 0;
    }
    div.Section1 { page: Section1; }
    body {
      font-family: 'Times New Roman', serif;
      font-size: 11pt;
      color: #111827;
      line-height: 1.45;
    }
    p { margin: 0 0 8pt 0; }
  </style>
</head>
<body>
  <div class="Section1">
    ${kopHtml}
    ${metaBlock}
    ${penerimaBlock}
    ${salamPembuka}
    ${paragrafPembuka}
    ${isiRincianBlock}
    ${paragrafPenutup}
    ${signBlock}
  </div>
</body>
</html>`;

  const cleanTitle = (d.perihal || 'Surat_Resmi').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 40);
  triggerBlobDownload(wordContent, `${cleanTitle}.doc`);
  showToast('Dokumen Surat (.doc) berhasil diunduh!', 'success');
}

function downloadCvAsDoc() {
  const d = getCvFormData();
  const accent = d.accentColor || '#1e40af';

  let experiencesHtml = '';
  if (d.experiences && d.experiences.length > 0) {
    experiencesHtml = `
      <div style="margin-top:14pt; margin-bottom:4pt; font-size:12pt; font-weight:bold; color:${accent}; text-transform:uppercase; border-bottom:1.5pt solid ${accent}; padding-bottom:2pt;">
        PENGALAMAN KERJA
      </div>
    ` + d.experiences.map(exp => `
      <div style="margin-bottom:10pt;">
        <table style="width:100%; border-collapse:collapse; margin-bottom:2pt;">
          <tr>
            <td style="font-size:10.5pt; font-weight:bold; color:#0f172a;">${escapeHtml(exp.role || 'Posisi Jabatan')}</td>
            <td style="font-size:9.5pt; font-weight:bold; color:#64748b; text-align:right;">${escapeHtml(exp.period || '')}</td>
          </tr>
        </table>
        <div style="font-size:9.5pt; color:#334155; font-style:italic; margin-bottom:3pt;">${escapeHtml(exp.company || '')} ${exp.location ? `• ${escapeHtml(exp.location)}` : ''}</div>
        ${exp.desc ? `<div style="font-size:9.5pt; color:#334155; line-height:1.45; white-space:pre-wrap;">${escapeHtml(exp.desc)}</div>` : ''}
      </div>
    `).join('');
  }

  let educationsHtml = '';
  if (d.educations && d.educations.length > 0) {
    educationsHtml = `
      <div style="margin-top:14pt; margin-bottom:4pt; font-size:12pt; font-weight:bold; color:${accent}; text-transform:uppercase; border-bottom:1.5pt solid ${accent}; padding-bottom:2pt;">
        RIWAYAT PENDIDIKAN
      </div>
    ` + d.educations.map(edu => `
      <div style="margin-bottom:8pt;">
        <table style="width:100%; border-collapse:collapse; margin-bottom:2pt;">
          <tr>
            <td style="font-size:10.5pt; font-weight:bold; color:#0f172a;">${escapeHtml(edu.school || 'Nama Institusi')}</td>
            <td style="font-size:9.5pt; font-weight:bold; color:#64748b; text-align:right;">${escapeHtml(edu.year || '')}</td>
          </tr>
        </table>
        <div style="font-size:9.5pt; color:#334155;">${escapeHtml(edu.degree || '')}</div>
        ${(edu.gpa || edu.notes) ? `
          <div style="font-size:9pt; color:#64748b; margin-top:2pt;">
            ${edu.gpa ? `<strong>${escapeHtml(edu.gpa)}</strong>` : ''} 
            ${edu.notes ? `<span>${escapeHtml(edu.notes)}</span>` : ''}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  let certsHtml = '';
  if (d.certifications && d.certifications.length > 0) {
    certsHtml = `
      <div style="margin-top:14pt; margin-bottom:4pt; font-size:12pt; font-weight:bold; color:${accent}; text-transform:uppercase; border-bottom:1.5pt solid ${accent}; padding-bottom:2pt;">
        SERTIFIKASI & LISENSI
      </div>
      <table style="width:100%; border-collapse:collapse;">
    ` + d.certifications.map(c => `
      <tr>
        <td style="font-size:9.5pt; color:#0f172a; padding:2pt 0;">• <strong>${escapeHtml(c.name)}</strong>${c.issuer ? ` <span style="color:#64748b;">— ${escapeHtml(c.issuer)}</span>` : ''}</td>
        <td style="font-size:9pt; color:#64748b; text-align:right; vertical-align:middle; padding:2pt 0;">${escapeHtml(c.year || '')}</td>
      </tr>
    `).join('') + `</table>`;
  }

  let skillsHtml = '';
  if (d.hardSkills || d.softSkills) {
    skillsHtml = `
      <div style="margin-top:14pt; margin-bottom:4pt; font-size:12pt; font-weight:bold; color:${accent}; text-transform:uppercase; border-bottom:1.5pt solid ${accent}; padding-bottom:2pt;">
        KEAHLIAN & KOMPETENSI
      </div>
      ${d.hardSkills ? `<div style="font-size:9.5pt; margin-bottom:4pt;"><strong>Keahlian Teknis / Hard Skills:</strong> ${escapeHtml(d.hardSkills)}</div>` : ''}
      ${d.softSkills ? `<div style="font-size:9.5pt; margin-bottom:4pt;"><strong>Soft Skills:</strong> ${escapeHtml(d.softSkills)}</div>` : ''}
    `;
  }

  let langHtml = '';
  if (d.languages) {
    langHtml = `
      <div style="margin-top:14pt; margin-bottom:4pt; font-size:12pt; font-weight:bold; color:${accent}; text-transform:uppercase; border-bottom:1.5pt solid ${accent}; padding-bottom:2pt;">
        PENGUASAAN BAHASA
      </div>
      <div style="font-size:9.5pt; line-height:1.45;">
        ${escapeHtml(d.languages).split('\n').map(l => escapeHtml(l)).join('<br>')}
      </div>
    `;
  }

  const contactItems = [];
  if (d.email) contactItems.push(`Email: ${escapeHtml(d.email)}`);
  if (d.phone) contactItems.push(`Telp: ${escapeHtml(d.phone)}`);
  if (d.location) contactItems.push(`Lokasi: ${escapeHtml(d.location)}`);
  if (d.linkedin) contactItems.push(`LinkedIn: ${escapeHtml(d.linkedin)}`);
  if (d.portfolio) contactItems.push(`Portofolio: ${escapeHtml(d.portfolio)}`);

  const wordContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>CV - ${escapeHtml(d.fullName || 'Curriculum Vitae')}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 595.3pt 841.9pt;
      margin: 45pt 50pt 45pt 50pt;
      mso-header-margin: 35.4pt;
      mso-footer-margin: 35.4pt;
      mso-paper-source: 0;
    }
    div.Section1 { page: Section1; }
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10pt;
      color: #1e293b;
      line-height: 1.45;
    }
  </style>
</head>
<body>
  <div class="Section1">
    <div style="text-align:center; margin-bottom:12pt;">
      <h1 style="font-size:20pt; font-weight:bold; color:#0f172a; margin:0 0 2pt 0; text-transform:uppercase; letter-spacing:0.5pt;">${escapeHtml(d.fullName || 'NAMA LENGKAP')}</h1>
      <div style="font-size:11.5pt; font-weight:bold; color:${accent}; margin-bottom:6pt;">${escapeHtml(d.headline || 'Headline Profesi')}</div>
      <div style="font-size:9pt; color:#64748b; line-height:1.4;">
        ${contactItems.join(' • ')}
      </div>
    </div>

    ${d.summary ? `
      <div style="margin-top:10pt; margin-bottom:4pt; font-size:12pt; font-weight:bold; color:${accent}; text-transform:uppercase; border-bottom:1.5pt solid ${accent}; padding-bottom:2pt;">
        RINGKASAN PROFESIONAL
      </div>
      <div style="font-size:9.5pt; color:#334155; line-height:1.5; text-align:justify; margin-bottom:10pt;">
        ${escapeHtml(d.summary).replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>')}
      </div>
    ` : ''}

    ${experiencesHtml}
    ${educationsHtml}
    ${skillsHtml}
    ${certsHtml}
    ${langHtml}
  </div>
</body>
</html>`;

  const cleanName = (d.fullName || 'Curriculum_Vitae').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 40);
  triggerBlobDownload(wordContent, `CV_${cleanName}.doc`);
  showToast('Dokumen CV (.doc) berhasil diunduh!', 'success');
}

/**
 * ==============================================================================
 * ZOOM & VIEWPORT CONTROLLER
 * ==============================================================================
 */
function adjustZoom(delta) {
  state.zoomLevel = Math.min(Math.max(state.zoomLevel + delta, 0.4), 1.6);
  applyPaperZoom();
}

function fitZoomToViewport() {
  const containerWidth = DOM.paperViewport.clientWidth - 40;
  const paperWidthPx = 794; // ~210mm at 96 DPI
  if (containerWidth < paperWidthPx) {
    state.zoomLevel = Math.max(containerWidth / paperWidthPx, 0.45);
  } else {
    state.zoomLevel = 1.0;
  }
  applyPaperZoom();
}

function applyPaperZoom() {
  DOM.letterPaper.style.transform = `scale(${state.zoomLevel})`;
  DOM.cvPaper.style.transform = `scale(${state.zoomLevel})`;
  DOM.zoomLabel.textContent = `${Math.round(state.zoomLevel * 100)}%`;
}

/**
 * ==============================================================================
 * TOAST NOTIFICATIONS
 * ==============================================================================
 */
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
    </svg>
    <span>${escapeHtml(message)}</span>
  `;
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
