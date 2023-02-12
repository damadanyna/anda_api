class Auth {
    static async login(req, res) {
        try {
            req.session.userId = 'dany';
            console.log(req.session);
            return res.send(req.session)
        } catch (error) {
            console.log('erreur', error);

        }
    }

    static async getState_(req, res) {
        try {
            if (req.session.userId) {
                return res.send({ status: true, data: req.session })
            } else {
                return res.send({ status: true, message: 'Deconnecter' })
            }
        } catch (error) {
            return error;
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy()
            res.send('deconnected')
        } catch (error) {
            console.log('erreur');
        }
    }

}
module.exports = Auth