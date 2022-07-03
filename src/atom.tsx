import { DocumentData } from "firebase/firestore";
import { atom, selector } from "recoil";
import { IFriend, IUserDB } from "./interfaces";

export const inputState = atom({
  key: "inputState",
  default: "",
});

export const genreState = atom({
  key: "genre",
  default: {
    id: "27",
    name: "액션",
  },
});

export const movieIDState = atom({
  key: "movieIDState",
  default: 568124,
});

export const movieInfoState = atom({
  key: "movieInfoState",
  default: {
    details: {
      adult: false,
      backdrop_path: "/eNI7PtK6DEYgZmHWP9gQNuff8pv.jpg",
      belongs_to_collection: {
        id: 2344,
        name: "The Matrix Collection",
        poster_path: "/bV9qTVHTVf0gkW0j7p7M0ILD4pG.jpg",
        backdrop_path: "/bRm2DEgUiYciDw3myHuYFInD7la.jpg",
      },
      budget: 190000000,
      genres: [{ id: 878, name: "Science Fiction" }],
      homepage: "https://www.whatisthematrix.com",
      id: 624860,
      imdb_id: "tt10838180",
      original_language: "en",
      original_title: "The Matrix Resurrections",
      overview:
        "Plagued by strange memories, Neo's life takes an unexpected turn when he finds himself back inside the Matrix.",
      popularity: 3117.579,
      poster_path: "/8c4a8kE7PizaGQQnditMmI1xbRp.jpg",
      production_companies: [
        {
          id: 174,
          logo_path: "/IuAlhI9eVC9Z8UQWOIDdWRKSEJ.png",
          name: "Warner Bros. Pictures",
          origin_country: "US",
        },
      ],
      production_countries: [
        { iso_3166_1: "US", name: "United States of America" },
      ],
      release_date: "2021-12-16",
      revenue: 148000000,
      runtime: 148,
      spoken_languages: [
        { english_name: "English", iso_639_1: "en", name: "English" },
      ],
      status: "Released",
      tagline: "Return to the source.",
      title: "The Matrix Resurrections",
      video: false,
      vote_average: 6.9,
      vote_count: 2474,
    },
    cast: [
      {
        adult: false,
        gender: 2,
        id: 6384,
        known_for_department: "Acting",
        name: "Keanu Reeves",
        original_name: "Keanu Reeves",
        popularity: 60.676,
        profile_path: "/rRdru6REr9i3WIHv2mntpcgxnoY.jpg",
        cast_id: 9,
        character: "Thomas A. Anderson / Neo",
        credit_id: "5d5c58dbc4904800167c7da0",
        order: 0,
      },
    ],
    crew: [
      {
        adult: false,
        gender: 2,
        id: 1071,
        known_for_department: "Directing",
        name: "Tom Tykwer",
        original_name: "Tom Tykwer",
        popularity: 12.47,
        profile_path: "/9jGSRfOnJTt8xvHtajWl4ZHRV0r.jpg",
        credit_id: "61380b98e93e95002bc15f63",
        department: "Sound",
        job: "Director",
      },
    ],
    videos: [
      {
        iso_639_1: "en",
        iso_3166_1: "US",
        name: "The Cast Explains The Matrix",
        key: "OZF7aFzcK4I",
        site: "YouTube",
        size: 1080,
        type: "Featurette",
        official: true,
        published_at: "2021-12-24T18:00:16.000Z",
        id: "61c700d566a0d3001cac18fe",
      },
    ],
    similarMovies: [
      {
        adult: false,
        backdrop_path: "/nnMXaofDjdWszZ7rbN9hKwK2PNg.jpg",
        genre_ids: [16, 10751, 12, 35],
        id: 7484,
        title: "Open Season",
        original_language: "en",
        original_title: "Open Season",
        overview:
          "Boog, a domesticated 900lb. Grizzly bear finds himself stranded in the woods 3 days before Open Season. Forced to rely on Elliot, a fast-talking mule deer, the two form an unlikely friendship and must quickly rally other forest animals if they are to form a rag-tag army against the hunters.",
        popularity: 26.069,
        poster_path: "/w5Lctmkc1yah215Luxmci4djaiW.jpg",
        release_date: "2006-09-29",
        video: false,
        vote_average: 6.138,
        vote_count: 2132,
      },
    ],
  },
});

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const ratingState = atom<"good" | "bad" | "">({
  key: "ratingState",
  default: "",
});

export const friendListState = atom({
  key: "friendListState",
  default: [
    {
      friendId: "DXnxeu4MKrUJQEdKxw425hxKm5E2",
      friendUsername: "test",
    },
  ],
});

export const userState = atom<DocumentData>({
  key: "userState",
  default: {
    friends: [
      { friendId: "DXnxeu4MKrUJQEdKxw425hxKm5E2", friendUsername: "test" },
    ],
    genres: {},
    id: "DXnxeu4MKrUJQEdKxw425hxKm5E2",
    movies: { watch: Array(1), bad: Array(1), good: Array(2) },
    username: "정연희",
  },
});

export const friendState = atom<IUserDB>({
  key: "friendState",
  default: {
    friends: [
      { friendId: "DXnxeu4MKrUJQEdKxw425hxKm5E2", friendUsername: "test" },
    ],
    genres: { sample: 1, sample2: 2 },
    id: "DXnxeu4MKrUJQEdKxw425hxKm5E2",
    movies: { watch: Array(1), bad: Array(1), good: Array(2) },
    username: "정연희",
  },
});

export const selectedFriendState = atom<IFriend>({
  key: "selectedFriendState",
  default: {
    friendId: "DXnxeu4MKrUJQEdKxw425hxKm5E2",
    friendUsername: "test",
  },
});

export const selectedFriendSelector = selector<string>({
  key: "selectedFriendSelector",
  get: ({ get }) => {
    const selectedFriend = get(selectedFriendState);
    return selectedFriend.friendId;
  },
});