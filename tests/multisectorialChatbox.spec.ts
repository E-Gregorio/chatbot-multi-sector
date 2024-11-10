import { test, expect, Page } from '@playwright/test';

const baseUrl = 'http://localhost:3000'; 

async function selectSector(page: Page, sector: string) {
    await page.click(`button[data-sector="${sector}"]`);
    await expect(page.locator('#currentSector')).toHaveText(`Sector actual: ${sector.charAt(0).toUpperCase() + sector.slice(1)}`);
}

test.describe('MultiSectorBot Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl);
    });

    test('Prueba de flujo de Salud', async ({ page }) => {
        await test.step('Seleccionar el sector de Salud', async () => {
            await selectSector(page, 'health');
        });

        await test.step('Enviar un mensaje para agendar una cita', async () => {
            await page.fill('#messageInput', 'Quiero agendar una cita');
            await page.click('[data-testid="send-button"]');
        });

        await test.step('Verificar la respuesta del bot', async () => {
            await expect(page.locator('#chatMessages')).toContainText('¿Te gustaría agendar una cita médica?');
        });
    });

    test('Prueba de flujo de E-Commerce', async ({ page }) => {
        await test.step('Seleccionar el sector de E-Commerce', async () => {
            await selectSector(page, 'ecommerce');
        });

        await test.step('Enviar un mensaje preguntando por productos', async () => {
            await page.fill('#messageInput', '¿Qué productos tienes?');
            await page.click('[data-testid="send-button"]');
        });

        await test.step('Verificar la respuesta del bot', async () => {
            await expect(page.locator('#chatMessages')).toContainText('¿Qué producto estás buscando?');
        });
    });

    test('Prueba de flujo de Banca', async ({ page }) => {
        await test.step('Seleccionar el sector de Banca', async () => {
            await selectSector(page, 'banking');
        });

        await test.step('Enviar un mensaje para consultar el saldo', async () => {
            await page.fill('#messageInput', 'Quiero saber mi saldo');
            await page.click('[data-testid="send-button"]');
        });

        await test.step('Verificar la respuesta del bot', async () => {
            await expect(page.locator('#chatMessages')).toContainText('Tu saldo actual es de $1,000.00');
        });
    });

});