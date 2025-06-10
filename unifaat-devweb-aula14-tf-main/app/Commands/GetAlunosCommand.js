import axios from "axios";
import CliTable3 from "cli-table3";

export default {

    name: 'get-alunos',
    description: 'obter alunos',
    arguments: {
        seconds: "number",
    },

    handle: async function () {


        const data = new URLSearchParams();
        data.append('email', 'user1@example.com');
        data.append('senha', '123456');

        try {
            const response = await axios.post('http://localhost:8080/login', data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const tokenData = response.data;

            console.log('Token obtido:', tokenData.token);

            let limit = 10;
            let offset = 0;

            const table = new CliTable3({
                head: ['Nome', 'Materias'],
                colWidths: [20, 20]
            })

            /** Codar Aqui */

            console.log(table.toString());
        } catch (error) {
            console.error('Erro na requisição:', error.response?.data || error.message);
            return;
        }


    }
}