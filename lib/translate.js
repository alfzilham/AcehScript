const kamus = require('./kamus');

/**
 * Menerjemahkan kode AcehScript menjadi kode JavaScript murni.
 * Metode: pencarian kata utuh (word-boundary) lalu diganti,
 * bukan menimpa string dalam string/komentar.
 *
 * @param {string} source - kode sumber .aceh
 * @returns {string} kode JavaScript hasil terjemahan
 */
function translate(source) {
  // Susun daftar kata kunci, urut dari yang paling panjang agar
  // "miseu_han" tidak keburu tergantikan sebagian oleh "miseu".
  const kataKunci = Object.keys(kamus).sort((a, b) => b.length - a.length);

  // Pisahkan kode menjadi segmen: string literal & komentar vs kode biasa,
  // supaya kata di dalam string/komentar tidak ikut diterjemahkan.
  const segmenRegex = /("([^"\\]|\\.)*")|('([^'\\]|\\.)*')|(`([^`\\]|\\.)*`)|(\/\/.*$)|(\/\*[\s\S]*?\*\/)/gm;

  let hasil = '';
  let posisiTerakhir = 0;
  let match;

  const gantiKodeBiasa = (potongan) => {
    let teks = potongan;
    for (const kata of kataKunci) {
      const regex = new RegExp(`\\b${escapeRegex(kata)}\\b`, 'g');
      teks = teks.replace(regex, kamus[kata]);
    }
    return teks;
  };

  while ((match = segmenRegex.exec(source)) !== null) {
    const sebelum = source.slice(posisiTerakhir, match.index);
    hasil += gantiKodeBiasa(sebelum);
    hasil += match[0]; // string/komentar asli, tidak diterjemahkan
    posisiTerakhir = segmenRegex.lastIndex;
  }
  hasil += gantiKodeBiasa(source.slice(posisiTerakhir));

  return hasil;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

module.exports = { translate };
