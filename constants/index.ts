import { Dispatch } from "react";

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
export interface IimagesSpotify {
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
    release_date: string;
    type: string;
}
export interface Iartists {
    name: string;
    id: string;
    images: IimagesSpotify[];
}
export interface ItrackRecentlyPlayed {
    album: Ialbum;
    artists: Iartists[];
    duration_ms: number;
    name: string;
}

export interface IrecentlyPlayed {
    played_at: string;
    track: ItrackRecentlyPlayed;
}
export interface IpropsRecentlyPlayed {
    data: IrecentlyPlayed;
}
export interface IpropsAlbum {
    data: IAlbum;
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

export interface Istate {
    loading: string;
    profile: IprofileResponse;
    playing: object;
}

export interface Iaction {
    type: string;
    payload: any;
}

export interface IStateGlbalContext {
    loading: boolean;
    profile: IprofileResponse;
}

export interface IGlobalContext {
    state: IStateGlbalContext;
    dispatch: Dispatch<any>;
}

export interface IAlbum {
    name: string;
    images: IimagesSpotify[];
    artists: Iartists[];
}
