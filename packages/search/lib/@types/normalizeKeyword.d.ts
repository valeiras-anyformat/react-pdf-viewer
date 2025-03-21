import { type FlagKeyword } from './types/FlagKeyword';
import { type NormalizedKeyword } from './types/NormalizedKeyword';
import { type SingleKeyword } from './types/SingleKeyword';
export declare const normalizeFlagKeyword: (flagKeyword: FlagKeyword) => NormalizedKeyword;
export declare const normalizeSingleKeyword: (keyword: SingleKeyword, matchCase?: boolean, wholeWords?: boolean) => NormalizedKeyword;
