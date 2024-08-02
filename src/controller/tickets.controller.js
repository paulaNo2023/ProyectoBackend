import { TicketsService } from "../service/ticket.service.js"

const ticketsService = new TicketsService();

export class TicketController {
    constructor() {
    }

    getTickets = async (req, res) => {
        try {
            const tickets = await ticketsService.getAll();
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvieron los tickets',
                payload: tickets
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No pudieron obtener los tickets',
                payload: error
            });
        }
    }

    getTicket = async (req, res) => {
        try {
            const { id } = req.params;
            const ticket = await ticketsService.getId(id)
            res.status(200).send({
                status: 'success',
                message: 'Se obtuvo el ticket',
                payload: ticket
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo obtener el ticket',
                payload: error
            });
        }
    }

    createTicket = async (req, res) => {
        try {
            const {code, purchase_datetime, amount, purchaser} = req.body;
            if(!code || !purchase_datetime || !amount || !purchaser) return res.status(400).send({
                status: 'error',
                message: 'Faltan datos'
            });
            const ticket = { code, purchase_datetime, amount, purchaser };
            const result = await ticketsService.create(ticket);
            res.status(201).send({
                status: 'success',
                message: 'Se creó el ticket',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo crear el ticket',
                payload: error
            });
        }
    }

    updateTicket = async (req, res) => {
        try {
            const { id } = req.params;
            const {code, purchase_datetime, amount, purchaser} = req.body;
            if(!code || !purchase_datetime || !amount || !purchaser) return res.status(400).send({
                status: 'error',
                message: 'Faltan datos'
            });
            const ticket = { code, purchase_datetime, amount, purchaser };
            const result = await ticketsService.update(id, ticket);
            res.status(200).send({
                status: 'success',
                message: 'Se actualizó el ticket',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo actualizar el ticket',
                payload: error
            });
        }
    }

    deleteTicket = async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ticketsService.delete(id);
            res.status(200).send({
                status: 'success',
                message: 'Se eliminó el ticket',
                payload: result
            });
        } catch (error) {
            res.status(500).send({
                status: 'error',
                message: 'No se pudo eliminar el ticket',
                payload: error
            });
        }
    }
}