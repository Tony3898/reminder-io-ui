import config from "../config";
import IoService from "./ioService";

class UserService extends IoService {

    constructor() {
        super();
    }

    async getProfile() {
        return this.request({
            method: 'GET',
            url: `${config.BASE_API_URL}/api/user/profile`,
            requiredToken: true,
            responseOnlyBody: true,
        });
    }

    async updateProfile(profileData: { name?: string; email?: string }) {
        return this.request({
            method: 'PUT',
            url: `${config.BASE_API_URL}/api/user/profile`,
            data: profileData,
            requiredToken: true,
            responseOnlyBody: true,
        });
    }

}

export default UserService;