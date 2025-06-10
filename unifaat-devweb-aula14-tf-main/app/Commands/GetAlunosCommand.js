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
                colWidths: [20, 50] // aumentei um pouco a largura das matérias
            });

            /** Codar Aqui */
            let hasNext = true;

            while (hasNext) {
                try {
                    const alunosResponse = await axios.get('http://localhost:8080/api/alunos', {
                        headers: {
                            'Authorization': `Bearer ${tokenData.token}`
                        },
                        params: {
                            offset: offset
                        }
                    });

                    const { data, next } = alunosResponse.data;

                    // Adicionar os alunos à tabela
                    data.forEach(aluno => {
                        const materiasNomes = aluno.Materias.map(materia => materia.nome).join(',\n');
                        table.push([aluno.nome, materiasNomes]);
                    });

                    // Atualizar offset ou encerrar loop
                    if (next !== null) {
                        offset = next;
                    } else {
                        hasNext = false;
                    }
                } catch (error) {
                    console.error('Erro ao obter alunos:', error.response?.data || error.message);
                    hasNext = false;
                }
            }

            console.log(table.toString());
        } catch (error) {
            console.error('Erro na requisição:', error.response?.data || error.message);
            return;
        }
    }
}
