const Aut_jwt = require("../models/app_auth");
var user = {
    name: "Dama",
    email: "damdanyna@gmail.com"
}
class Auth {
    static async login(req, res) {
        try {
            const token = Aut_jwt.create_token(user)
            return res.cookie('access_token', token, { sameSite: 'none', secure: true }).send({ status: true, message: 'logged leka' })
        } catch (error) {
            console.log('erreur', error);
        }
    }

    static async logout(req, res) {
        return res.clearCookie('access_token', { sameSite: 'none', secure: true })
            .send({ status: true, message: 'deconnecter' })
    }

}
module.exports = Auth