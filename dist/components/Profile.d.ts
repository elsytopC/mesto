import { ProfileData } from '../types';
/**
 * Profile component class for managing user profile
 */
export declare class Profile {
    private nameElement;
    private professionElement;
    private avatarElement;
    private data;
    constructor(nameElement: HTMLElement, professionElement: HTMLElement, avatarElement: HTMLImageElement, initialData: ProfileData);
    /**
     * Update profile display
     */
    private updateDisplay;
    /**
     * Update profile data
     */
    updateProfile(newData: ProfileData): void;
    /**
     * Get current profile data
     */
    getProfileData(): ProfileData;
    /**
     * Update avatar
     */
    updateAvatar(avatarUrl: string): void;
    /**
     * Get name element for form population
     */
    getNameElement(): HTMLElement;
    /**
     * Get profession element for form population
     */
    getProfessionElement(): HTMLElement;
}
//# sourceMappingURL=Profile.d.ts.map