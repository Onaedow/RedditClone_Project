import { Timestamp } from "@google-cloud/firestore";
import { atom } from "recoil";

// 创造类

export interface Community {
    id: string;
    createId: string;
    numberOfMembers: number;
    privacyType: 'public' | 'restricted' | 'private'
    createAt?: Timestamp;
    imageURL?: string;
}

export interface CommunitySnippets {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string;
}

interface CommunityState {
    mySnippets: CommunitySnippets[];
    currentCommunity?: Community;
    // visitedCommunities
}

const defaultCommunityState: CommunityState = {
    mySnippets: []
}

export const communityState = atom<CommunityState> ({
    key: 'communityState',
    default: defaultCommunityState
})