import { Command } from "commander";

const program = new Command();

program
    .option('-p, --port <port>', 'Puerto del servidor', 8080)
    .requiredOption('-e, --env <env>', 'Ambiente del servidor', 'No se declaro el ambiente del servidor')

program.parse();

console.log('Options', program.opts());