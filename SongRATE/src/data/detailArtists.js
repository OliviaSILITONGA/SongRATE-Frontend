import Lady_Gaga from "../assets/Lady_Gaga.jpg";
import Adele from "../assets/Adele.jpg";
import Bruno_Mars from "../assets/Bruno_Mars.jpg";
import The_Weeknd from "../assets/The_Weeknd.png";
import Taylor_Swift from "../assets/TaylorSwift.png";
import Bad_Bunny from "../assets/Bad_Bunny.png";
import Doja_Cat from "../assets/Doja_Cat.png";
import Ed_Sherran from "../assets/Ed_Sherran.jpg";
import Billie_Eilish from "../assets/Billie_Ellish.png";
import Ariana_Grande from "../assets/Ariana_Grande.png";
import Justin_Bieber from "../assets/Justin_Bieber.png";
import Kendrick_Lamar from "../assets/Kendrick_Lamar.png";
import SZA from "../assets/SZA.png";
import Tyler_Creator from "../assets/Tyler_Creator.jpg";
import Sabrina_Carpenter from "../assets/Sabrina_Carpenter.jpg";
import Benson_Boone from "../assets/Benson_Boone.jpg";

const detailArtists = [
  {
    id: 1,
    name: "Lady Gaga",
    image: Lady_Gaga,
    bio: "Lady Gaga (Stefani Joanne Angelina Germanotta) is an American singer-songwriter born on March 28, 1986 in New York City. She is known for her powerful vocals, unique fashion, and theatrical performances.",
    songs: [
      { title: "Born This Way", artist: "Lady Gaga", reviews: 958760 },
      {
        title: "Die With A Smile",
        artist: "Lady Gaga & Bruno Mars",
        reviews: 904256,
      },
      {
        title: "Just Dance",
        artist: "Lady Gaga ft. Colby O'Donis",
        reviews: 875995,
      },
      {
        title: "Rain On Me",
        artist: "Lady Gaga & Ariana Grande",
        reviews: 821456,
      },
      {
        title: "Shallow",
        artist: "Lady Gaga & Bradley Cooper",
        reviews: 745895,
      },
    ],
  },

  {
    id: 2,
    name: "Adele",
    image: Adele,
    bio: "Adele Laurie Blue Adkins is an English singer-songwriter known for her emotional vocals and record-breaking albums.",
    songs: [
      { title: "Hello", artist: "Adele", reviews: 998743 },
      { title: "Someone Like You", artist: "Adele", reviews: 975321 },
      { title: "Rolling in the Deep", artist: "Adele", reviews: 943211 },
      { title: "Easy On Me", artist: "Adele", reviews: 912455 },
      { title: "Set Fire to the Rain", artist: "Adele", reviews: 854322 },
    ],
  },

  {
    id: 3,
    name: "Bruno Mars",
    image: Bruno_Mars,
    bio: "Bruno Mars is an American singer, songwriter, and performer known for his soulful voice and energetic stage presence.",
    songs: [
      { title: "Uptown Funk", artist: "Bruno Mars", reviews: 998120 },
      { title: "Just The Way You Are", artist: "Bruno Mars", reviews: 954230 },
      { title: "Locked Out of Heaven", artist: "Bruno Mars", reviews: 929182 },
      { title: "Grenade", artist: "Bruno Mars", reviews: 884251 },
      { title: "24K Magic", artist: "Bruno Mars", reviews: 801122 },
    ],
  },

  {
    id: 4,
    name: "The Weeknd",
    image: The_Weeknd,
    bio: "Abel Tesfaye, also known as The Weeknd, is a Canadian artist famous for his dark R&B style and cinematic sound.",
    songs: [
      { title: "Blinding Lights", artist: "The Weeknd", reviews: 1001288 },
      { title: "Starboy", artist: "The Weeknd ft. Daft Punk", reviews: 972344 },
      { title: "Save Your Tears", artist: "The Weeknd", reviews: 921332 },
      { title: "Can't Feel My Face", artist: "The Weeknd", reviews: 899000 },
      { title: "The Hills", artist: "The Weeknd", reviews: 855292 },
    ],
  },

  {
    id: 5,
    name: "Taylor Swift",
    image: Taylor_Swift,
    bio: "Taylor Swift is an American singer-songwriter known for her narrative songwriting and genre-spanning discography.",
    songs: [
      { title: "Anti-Hero", artist: "Taylor Swift", reviews: 987200 },
      { title: "Cruel Summer", artist: "Taylor Swift", reviews: 954883 },
      { title: "Blank Space", artist: "Taylor Swift", reviews: 909221 },
      { title: "Lover", artist: "Taylor Swift", reviews: 854100 },
      { title: "Shake It Off", artist: "Taylor Swift", reviews: 842355 },
    ],
  },

  {
    id: 6,
    name: "Bad Bunny",
    image: Bad_Bunny,
    bio: "Bad Bunny is a Puerto Rican rapper and global reggaeton superstar known for pushing Latin trap to mainstream success.",
    songs: [
      { title: "Tití Me Preguntó", artist: "Bad Bunny", reviews: 934522 },
      { title: "Moscow Mule", artist: "Bad Bunny", reviews: 901221 },
      { title: "Un Preview", artist: "Bad Bunny", reviews: 875233 },
      { title: "Dakiti", artist: "Bad Bunny & Jhay Cortez", reviews: 832112 },
      { title: "La Canción", artist: "Bad Bunny", reviews: 789210 },
    ],
  },

  {
    id: 7,
    name: "Doja Cat",
    image: Doja_Cat,
    bio: "Doja Cat is an American rapper and singer known for her mix of pop, rap, and R&B styles.",
    songs: [
      { title: "Paint The Town Red", artist: "Doja Cat", reviews: 944122 },
      { title: "Woman", artist: "Doja Cat", reviews: 902133 },
      { title: "Say So", artist: "Doja Cat", reviews: 884221 },
      { title: "Streets", artist: "Doja Cat", reviews: 832150 },
      { title: "Agora Hills", artist: "Doja Cat", reviews: 754221 },
    ],
  },

  {
    id: 8,
    name: "Ed Sheeran",
    image: Ed_Sherran,
    bio: "Ed Sheeran is an English singer-songwriter famous for his acoustic pop hits and heartfelt lyrics.",
    songs: [
      { title: "Shape of You", artist: "Ed Sheeran", reviews: 1052300 },
      { title: "Perfect", artist: "Ed Sheeran", reviews: 970321 },
      { title: "Shivers", artist: "Ed Sheeran", reviews: 904500 },
      { title: "Bad Habits", artist: "Ed Sheeran", reviews: 863232 },
      { title: "Thinking Out Loud", artist: "Ed Sheeran", reviews: 832211 },
    ],
  },

  {
    id: 9,
    name: "Billie Eilish",
    image: Billie_Eilish,
    bio: "Billie Eilish is an American singer-songwriter known for her whispery vocals and dark pop sound.",
    songs: [
      { title: "Bad Guy", artist: "Billie Eilish", reviews: 987311 },
      {
        title: "What Was I Made For?",
        artist: "Billie Eilish",
        reviews: 945221,
      },
      { title: "Lovely", artist: "Billie Eilish & Khalid", reviews: 912123 },
      { title: "Bury A Friend", artist: "Billie Eilish", reviews: 871201 },
      { title: "Ocean Eyes", artist: "Billie Eilish", reviews: 834222 },
    ],
  },

  {
    id: 10,
    name: "Ariana Grande",
    image: Ariana_Grande,
    bio: "Ariana Grande is an American singer and actress with a wide vocal range and numerous pop hits.",
    songs: [
      { title: "7 Rings", artist: "Ariana Grande", reviews: 980321 },
      { title: "One Last Time", artist: "Ariana Grande", reviews: 944221 },
      { title: "Yes, And?", artist: "Ariana Grande", reviews: 912233 },
      { title: "Thank U, Next", artist: "Ariana Grande", reviews: 893233 },
      {
        title: "No Tears Left To Cry",
        artist: "Ariana Grande",
        reviews: 865500,
      },
    ],
  },

  {
    id: 11,
    name: "Justin Bieber",
    image: Justin_Bieber,
    bio: "Justin Bieber is a Canadian pop singer who rose to global fame as a teenager.",
    songs: [
      { title: "Peaches", artist: "Justin Bieber", reviews: 932221 },
      { title: "Sorry", artist: "Justin Bieber", reviews: 901232 },
      { title: "Love Yourself", artist: "Justin Bieber", reviews: 884221 },
      { title: "Ghost", artist: "Justin Bieber", reviews: 854220 },
      { title: "Baby", artist: "Justin Bieber", reviews: 833211 },
    ],
  },

  {
    id: 12,
    name: "Kendrick Lamar",
    image: Kendrick_Lamar,
    bio: "Kendrick Lamar is an American rapper known for his poetic lyricism and socially conscious music.",
    songs: [
      { title: "HUMBLE.", artist: "Kendrick Lamar", reviews: 952122 },
      { title: "Alright", artist: "Kendrick Lamar", reviews: 901211 },
      { title: "Money Trees", artist: "Kendrick Lamar", reviews: 884200 },
      { title: "DNA.", artist: "Kendrick Lamar", reviews: 872100 },
      { title: "Swimming Pools", artist: "Kendrick Lamar", reviews: 811300 },
    ],
  },

  {
    id: 13,
    name: "SZA",
    image: SZA,
    bio: "SZA is an American R&B singer known for her emotional vocals and genre-blending sound.",
    songs: [
      { title: "Kill Bill", artist: "SZA", reviews: 941233 },
      { title: "Saturn", artist: "SZA", reviews: 902500 },
      { title: "Snooze", artist: "SZA", reviews: 874233 },
      { title: "Good Days", artist: "SZA", reviews: 832100 },
      { title: "Open Arms", artist: "SZA", reviews: 811200 },
    ],
  },

  {
    id: 14,
    name: "Tyler, The Creator",
    image: Tyler_Creator,
    bio: "Tyler, The Creator is an American rapper and producer known for his artistic visuals and genre-bending albums.",
    songs: [
      { title: "EARFQUAKE", artist: "Tyler, The Creator", reviews: 873200 },
      { title: "See You Again", artist: "Tyler, The Creator", reviews: 842100 },
      { title: "Dogtooth", artist: "Tyler, The Creator", reviews: 801000 },
      { title: "IFHY", artist: "Tyler, The Creator", reviews: 754200 },
      { title: "WUSYANAME", artist: "Tyler, The Creator", reviews: 733211 },
    ],
  },

  {
    id: 15,
    name: "Sabrina Carpenter",
    image: Sabrina_Carpenter,
    bio: "Sabrina Carpenter is an American singer and actress known for her catchy pop songs.",
    songs: [
      { title: "Espresso", artist: "Sabrina Carpenter", reviews: 951221 },
      { title: "Feather", artist: "Sabrina Carpenter", reviews: 904222 },
      {
        title: "Please Please Please",
        artist: "Sabrina Carpenter",
        reviews: 901200,
      },
      { title: "Nonsense", artist: "Sabrina Carpenter", reviews: 872211 },
      {
        title: "Because I Liked A Boy",
        artist: "Sabrina Carpenter",
        reviews: 812221,
      },
    ],
  },

  {
    id: 16,
    name: "Benson Boone",
    image: Benson_Boone,
    bio: "Benson Boone is an American singer-songwriter rising quickly in the global pop scene.",
    songs: [
      { title: "Beautiful Things", artist: "Benson Boone", reviews: 945522 },
      { title: "Ghost Town", artist: "Benson Boone", reviews: 902220 },
      { title: "Slow It Down", artist: "Benson Boone", reviews: 874221 },
      { title: "Forever And A Day", artist: "Benson Boone", reviews: 833221 },
      { title: "In The Stars", artist: "Benson Boone", reviews: 799221 },
    ],
  },
];

export default detailArtists;
