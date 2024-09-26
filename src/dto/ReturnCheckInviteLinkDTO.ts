import { GetInviteLinkDTO } from "./GetInviteLinkDTO";

export class ReturnCheckInviteLinkDTO {
    success: boolean;
    userData: GetInviteLinkDTO | null;


    constructor(success: boolean, userData: GetInviteLinkDTO | null) {
        this.success = success;
        this.userData = userData;
    }
}