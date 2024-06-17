let initialUsers = {
  user1: {
    username: 'gerald',
     password: 'pass1',
     usertype: 'student',

  },
  user2: {
    username: 'darwin',
    password: 'word2',
    usertype: 'admin',

  },  
};
if (!localStorage.getItem('Users')) {
  localStorage.setItem('Users', JSON.stringify(initialUsers));
}
const storedUsersJSON = localStorage.getItem('Users');
export const storedUsers = JSON.parse(storedUsersJSON) || {};
export let active = JSON.parse(localStorage.getItem('active')) || [];

export const books = [
  { title: 'No Room for Regret', cover: '../mock-database/book_cover/no_room_for_regret.jpg', file_link:'../mock-database/book_files/No-Room-For-Regret.pdf', category: 'Thriller', author: 'unknown' },
  { title: 'Mastermind', cover: '../mock-database/book_cover/mastermind.jpg', file_link:'../mock-database/book_files/Mastermind.pdf', category: 'Thriller', author: 'unknown' },
  { title: 'Back-up Bridge in Time', cover: '../mock-database/book_cover/back-up_BridgeinTime.jpg', file_link:'../mock-database/book_files/BACK-UP-Bridge-in-Time.pdf', category: 'Thriller', author: 'unknown' },
  { title: 'Around the World in 80 Days', cover: '../mock-database/book_cover/ATWin80Days.jpg', file_link:'../mock-database/book_files/Around-the-World-in-80-Days.pdf', category: 'Thriller', author: 'unknown' },
  { title: 'The Merry Adventures of Robin Hood', cover: '../mock-database/book_cover/TMAORH.jpg', file_link:'../mock-database/book_files/The-Merry-Adventures-of-Robin-Hood.pdf', category: 'Thriller', author: 'unknown' },
  { title: "The New Hacker's Dictionary", cover: '../mock-database/book_cover/TNHD.jpg', file_link:"../mock-database/book_files/The-New-Hacker's-Dictionary.pdf", category: 'Thriller', author: 'unknown' },
  { title: "Hitchhiker's-Guide-to-the-Internet", cover: '../mock-database/book_cover/HGTTI.jpg', file_link:"../mock-database/book_files/Hitchhiker's-Guide-to-the-Internet.pdf", category: 'Thriller', author: 'unknown' }
];