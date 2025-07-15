/**
 * Profile component class for managing user profile
 */
export class Profile {
    constructor(nameElement, professionElement, avatarElement, initialData) {
        this.nameElement = nameElement;
        this.professionElement = professionElement;
        this.avatarElement = avatarElement;
        this.data = initialData;
        this.updateDisplay();
    }
    /**
     * Update profile display
     */
    updateDisplay() {
        this.nameElement.textContent = this.data.name;
        this.professionElement.textContent = this.data.profession;
    }
    /**
     * Update profile data
     */
    updateProfile(newData) {
        this.data = newData;
        this.updateDisplay();
    }
    /**
     * Get current profile data
     */
    getProfileData() {
        return { ...this.data };
    }
    /**
     * Update avatar
     */
    updateAvatar(avatarUrl) {
        this.avatarElement.src = avatarUrl;
    }
    /**
     * Get name element for form population
     */
    getNameElement() {
        return this.nameElement;
    }
    /**
     * Get profession element for form population
     */
    getProfessionElement() {
        return this.professionElement;
    }
}
//# sourceMappingURL=Profile.js.map