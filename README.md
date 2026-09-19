# AcehScript

Bahasa skrip berbasis Bahasa Aceh yang memiliki struktur sama persis dengan JavaScript, karena pada dasarnya hanya diterjemahkan (transpiled) menjadi JavaScript murni.

## Cara Kerja

Ada satu file kamus (`lib/kamus.js`) yang memetakan kata kunci Bahasa Aceh ke kata kunci JavaScript. Saat file `.aceh` atau `.as` dijalankan, isinya dipindai kata demi kata, lalu kata kunci yang cocok diganti dengan padanan JavaScript-nya. Tidak ada parser/AST — murni pencarian & penggantian kata utuh (word-boundary), dengan pengecualian string literal dan komentar yang tidak ikut diterjemahkan.

## Instalasi

```
npm i -g .
```

Atau jalankan langsung tanpa install global:

```
node index.js <file>.aceh
```

## Cara Pakai

Menjalankan satu file:

```
acehskrip nama_file.aceh
# atau
acehskrip nama_file.as
```

Build seluruh file `.aceh`/`.as` dalam folder menjadi `.js`:

```
acehskrip --dir ./nama_folder
```

## Contoh

Lihat `example/hello.aceh` untuk contoh lengkap (variabel, fungsi, percabangan, perulangan, try-catch, class).

## Kamus Kata Kunci

| AcehScript | JavaScript | AcehScript | JavaScript |
|---|---|---|---|
| mulog | var | tre | try |
| ci | let | drop | catch |
| hitong | const | akhejih | finally |
| miseu | if | rhoem | throw |
| han | else | peutameng | import |
| miseu_han | else if | peutubiet | export |
| geulantoe | switch | dari | from |
| kasus | case | seubago | as |
| biasa | default | lagena | default (export) |
| peuhanco | break | periksa | typeof |
| keu | for | contoh_dari | instanceof |
| selama | while | hapoh | delete |
| pubuet | do | soh | void |
| lanjut | continue | dalam | in |
| daripada | of | peuleumah | console.log |
| peugot_baro | function | error_lagoe | console.error |
| balek_bakset | return | ngen | with |
| peusinkron | async | kraleub | debugger |
| preh | await | butoi | true |
| hase | yield | salah | false |
| local | class | hana_sapeu_na | null |
| meuluah | extends | hanjeut_takira | undefined |
| hayeu | super | ken_numboi | NaN |
| baro | new | statis | static |
| nyoe | this | cok | get |
| | | ato | set |

## Catatan

Proyek ini dibuat sebagai media belajar/hiburan, terinspirasi dari proyek serupa seperti [jawascript](https://github.com/ernestoyoofi/jawascript) dan [jaksel-language](https://github.com/RioChndr/jaksel-language).
