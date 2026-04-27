export const REVIEWS = {
  terrible: [
    "Sangat buruk. Jangan harap laku di pasaran dengan spek purba seperti ini.",
    "Ini konsol atau kalkulator bekas? Teknologinya sangat tertinggal.",
    "Bencana teknologi. Gamer akan menertawakan produk ini.",
    "Bahkan untuk standar sepuluh tahun lalu, ini masih dianggap jelek.",
    "Saya kehabisan kata-kata untuk mendeskripsikan betapa usangnya perangkat ini."
  ],
  bad: [
    "Mengecewakan. Teknologinya terasa usang.",
    "Di bawah standar pasar saat ini. Susah bersaing.",
    "Ada banyak ruang untuk perbaikan. Spesifikasinya nanggung.",
    "Hanya akan laku jika dijual sangat murah. Kompetitor jauh lebih baik.",
    "Gamer hardcore pasti akan mengabaikan konsol ini."
  ],
  average: [
    "Cukup layak. Tidak ada yang istimewa tapi berfungsi dengan baik.",
    "Konsol standar yang aman. Tidak inovatif, tapi juga tidak jelek.",
    "Pas untuk gamer kasual. Sesuai dengan ekspektasi tahun ini.",
    "Bisa bersaing di pasar, walau bukan yang terhebat.",
    "Desain dan performa yang sangat 'rata-rata'. Cukup oke."
  ],
  good: [
    "Sangat bagus. Punya fitur canggih yang pasti disukai gamer.",
    "Performa solid! Konsol ini jelas merupakan pesaing kuat di pasar.",
    "Kualitas perangkat keras yang mengesankan. Jauh di atas rata-rata.",
    "Inovatif dan bertenaga. Para kritikus pasti menyukainya.",
    "Sistem yang hebat. Akan menjadi incaran banyak orang tahun ini."
  ],
  masterpiece: [
    "Luar biasa! Teknologi ini jauh melampaui zamannya. Sebuah mahakarya!",
    "Revolusioner! Ini akan mengubah sejarah industri game selamanya.",
    "Spesifikasi monster! Belum ada yang bisa menandingi kekuatan konsol ini.",
    "Sempurna. Standar emas baru untuk industri hiburan.",
    "Bukan sekadar konsol, ini adalah lompatan teknologi masa depan."
  ]
};

export function getRandomReview(scoreRatio: number): { stars: number, message: string } {
  let stars = 3;
  let category: keyof typeof REVIEWS = "average";

  if (scoreRatio >= 1.5) {
    stars = 5;
    category = "masterpiece";
  } else if (scoreRatio >= 1.2) {
    stars = 4;
    category = "good";
  } else if (scoreRatio >= 0.8) {
    stars = 3;
    category = "average";
  } else if (scoreRatio >= 0.5) {
    stars = 2;
    category = "bad";
  } else {
    stars = 1;
    category = "terrible";
  }

  const messages = REVIEWS[category];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return { stars, message: randomMessage };
}
