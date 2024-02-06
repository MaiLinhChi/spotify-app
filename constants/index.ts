export interface IiconProps {
    width?: number;
    height?: number;
    className?: string;
}

export interface IauthResponse {
    access_token: string;
    expires_in: number | string;
}

interface Ifollowers {
    href: string | null;
    total: number;
}
interface IimagesSpotify {
    url: string;
    height: number;
    width: number;
}
export interface IprofileResponse {
    id: string;
    country: string;
    display_name: string;
    email: string;
    followers: Ifollowers;
    images: IimagesSpotify[];
}

interface Ialbum {
    images: IimagesSpotify[];
    name: string;
}
interface Iartists {
    name: string;
}
export interface ItrackRecentlyPlayed {
    album: Ialbum;
    artists: Iartists[];
    duration_ms: number;
    name: string;
}
interface IlikedSongs {
    name: string;
    type: string;
}
export interface IrecentlyPlayed {
    played_at?: string;
    track: ItrackRecentlyPlayed | IlikedSongs;
}
export interface IpropsRecentlyPlayed {
    data: IrecentlyPlayed;
}

interface IplayListItem {
    name: string;
    description: string;
    images: IimagesSpotify[];
}

export interface IplayList {
    message: string;
    playlists: {
        items: IplayListItem[];
    };
}
export interface IpropsPlayList {
    category_id: string;
}

export interface Props {
    children: string | JSX.Element | JSX.Element[];
}
