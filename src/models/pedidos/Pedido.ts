import { PedidoSemItensError } from "../../errors/PedidoSemItens.error";
import { Cliente } from "../usuarios/Cliente";
import { ItemMenu } from "./ItemMenu";

export class Pedido {
	private itens: ItemMenu[] = [];
	total: number = 0;
	pagamentoConfirmado: boolean = false;
	entregue: boolean = false;

	constructor(public cliente: Cliente) {}

	get id() {
		return 1;
	}

	adicionarItem(item: ItemMenu) {
		if (this.itens.length >= 5) {
			// Restrição de até 5 itens por pedido
			throw new Error("Limite máximo de itens por pedido alcançado.");
		}
		if (!this.verificarDisponibilidadeItem(item)) {
			throw new Error(
				`O item ${item.nome} não está disponível no momento.`
			);
		}
		this.itens.push(item);
		this.atualizarTotal();
	}

	atualizarTotal() {
		this.total = this.itens.reduce((total, item) => total + item.preco, 0);
	}

	confirmarPagamento() {
		this.lancarErroSePedidoSemItens();

		this.pagamentoConfirmado = true;
	}

	marcarComoEntregue() {
		this.lancarErroSePedidoSemItens();

		this.entregue = true;
	}

	verificarDisponibilidadeItem(item: ItemMenu): boolean {
		// Lógica para verificar a disponibilidade do item no menu
		return true; // Supondo que todos os itens estão disponíveis
	}

	get temItens(): boolean {
		return this.itens.length > 0;
	}

	private lancarErroSePedidoSemItens() {
		if (!this.temItens) {
			throw new PedidoSemItensError();
		}
	}
}
