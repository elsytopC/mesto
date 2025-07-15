import { ProfileData } from '../types';

/**
 * Profile component class for managing user profile
 */
export class Profile {
    private nameElement: HTMLElement;
    private professionElement: HTMLElement;
    private avatarElement: HTMLImageElement;
    private data: ProfileData;

    constructor(
        nameElement: HTMLElement,
        professionElement: HTMLElement,
        avatarElement: HTMLImageElement,
        initialData: ProfileData
    ) {
        this.nameElement = nameElement;
        this.professionElement = professionElement;
        this.avatarElement = avatarElement;
        this.data = initialData;
        
        this.updateDisplay();
    }

    /**
     * Update profile display
     */
    private updateDisplay(): void {
        this.nameElement.textContent = this.data.name;
        this.professionElement.textContent = this.data.profession;
    }

    /**
     * Update profile data
     */
    public updateProfile(newData: ProfileData): void {
        this.data = newData;
        this.updateDisplay();
    }

    /**
     * Get current profile data
     */
    public getProfileData(): ProfileData {
        return { ...this.data };
    }

    /**
     * Update avatar
     */
    public updateAvatar(avatarUrl: string): void {
        this.avatarElement.src = avatarUrl;
    }

    /**
     * Get name element for form population
     */
    public getNameElement(): HTMLElement {
        return this.nameElement;
    }

    /**
     * Get profession element for form population
     */
    public getProfessionElement(): HTMLElement {
        return this.professionElement;
    }
}