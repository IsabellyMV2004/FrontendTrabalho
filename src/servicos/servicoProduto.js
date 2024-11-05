const urlBase = 'https://backend-trabalho.vercel.app/produtos';

/**
 * Função para criar um novo produto
 * @param {Object} produto - Dados do produto a ser criado
 * @returns {Object} Resultado da criação
 */
export async function gravarProduto(produto) {
    try {
        const resposta = await fetch(urlBase, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(produto)
        });

        if (!resposta.ok) {
            throw new Error('Erro ao criar produto');
        }

        const resultado = await resposta.json();
        return resultado;
    } catch (error) {
        console.error("Erro ao gravar produto:", error);
        return { status: false, mensagem: error.message };
    }
}

/**
 * Função para alterar um produto existente
 * @param {Object} produto - Dados do produto a ser alterado
 * @returns {Object} Resultado da alteração
 */
export async function alterarProduto(produto) {
    try {
        const resposta = await fetch(urlBase, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(produto)
        });

        if (!resposta.ok) {
            throw new Error('Erro ao alterar produto');
        }

        const resultado = await resposta.json();
        return resultado;
    } catch (error) {
        console.error("Erro ao alterar produto:", error);
        return { status: false, mensagem: error.message };
    }
}

/**
 * Função para excluir um produto
 * @param {Object} produto - Produto a ser excluído
 * @returns {Object} Resultado da exclusão
 */
export async function excluirProduto(produto) {
    try {
        const resposta = await fetch(`${urlBase}/${produto.codigo}`, {
            method: "DELETE",
        });

        if (!resposta.ok) {
            throw new Error('Erro ao excluir produto');
        }

        const resultado = await resposta.json();
        return resultado;
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        return { status: false, mensagem: error.message };
    }
}

/**
 * Função para consultar a lista de produtos
 * @returns {Array} Lista de produtos
 */
export async function consultarProduto() {
    try {
        const resposta = await fetch(urlBase, {
            method: "GET"
        });

        if (!resposta.ok) {
            throw new Error('Erro ao consultar produtos');
        }

        const resultado = await resposta.json();
        return resultado;
    } catch (error) {
        console.error("Erro ao consultar produtos:", error);
        return [];
    }
}
