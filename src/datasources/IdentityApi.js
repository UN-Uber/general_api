import { RESTDataSource } from "apollo-datasource-rest";
import axios from "axios";

export class IdentityApi extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = "https://identity-ms-2nnoe2z3rq-uc.a.run.app";
	}

	async verifyToken(token) {
        try{
            const response = await axios.post(this.baseURL + "/auth/verifyToken", null, {
                headers: { Authorization: token },
            });
            return response;
        }catch(error){
            return error.response;
        }

	}

	async generateToken(payload) {
		const response = await axios.post(
			this.baseURL + "/auth/generateToken",
			{ payload }
		);
		return response;
	}
}
