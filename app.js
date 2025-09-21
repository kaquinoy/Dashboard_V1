// ===========================
// REACTIVA PERU ANALYTICS JS
// Optimized for Netlify deployment
// ===========================

console.log('Inicializando Reactiva Peru Analytics...');

// Global variables
let charts = {};

// Data with REAL numbers from analysis
const realData = {
    lorenz: {
        empresas: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100],
        credito: [0, 0.1, 0.3, 0.8, 1.5, 2.3, 3.5, 5.4, 7.8, 14.9, 25.2, 53.6, 100],
        igualdad: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]
    },
    sectores: {
        labels: ['Comercio', 'Transporte', 'Industria', 'Inmobiliarias', 'Construccion', 'Otros Servicios', 'Agricultura', 'Restaurantes'],
        participacion: [47.5, 11.9, 9.7, 8.0, 5.4, 5.5, 4.3, 4.9],
        eficiencia: [0.83, 0.88, 1.52, 1.51, 0.88, 0.86, 1.20, 0.61],
        colors: ['#D91023', '#FF6B7A', '#17a2b8', '#28a745', '#ffc107', '#6c757d', '#e83e8c', '#fd7e14']
    },
    departamentos: {
        labels: ['Lima', 'Arequipa', 'La Libertad', 'Callao', 'Piura', 'Cusco', 'Lambayeque', 'Junin', 'Puno', 'Cajamarca', 'Ica', 'Ancash', 'San Martin', 'Loreto', 'Ucayali'],
        montos: [36296, 2720, 2528, 1830, 1684, 1396, 1352, 1185, 1065, 1030, 1000, 923, 759, 743, 608],
        colors: function() {
            return this.labels.map((label, index) =>
                index === 0 ? '#D91023' : '#17a2b8'
            );
        }
    },
    entidades: {
        labels: ['MIBANCO', 'CREDITO', 'BBVA', 'INTERBANK', 'SCOTIABANK', 'CMAC AREQUIPA', 'CMAC CUSCO', 'CMAC HUANCAYO'],
        prestamos: [255671, 64832, 25101, 19677, 12296, 22095, 19331, 19101],
        tickets: [10.6, 403.3, 454.7, 334.2, 422.5, 20.0, 40.9, 22.8],
        colors: ['#D91023', '#FF6B7A', '#17a2b8', '#28a745', '#ffc107', '#6c757d', '#e83e8c', '#fd7e14']
    },
    lima: {
        labels: ['Lima', 'Resto del Peru'],
        credito: [62.7, 37.3],
        empresas: [30.6, 69.4],
        colors: ['#D91023', '#17a2b8']
    }
};

// Chart creation functions
function createLorenzChart() {
    const ctx = document.getElementById('lorenzChart');
    if (!ctx) return;

    const status = document.getElementById('lorenz-status');

    try {
        charts.lorenz = new Chart(ctx, {
            type: 'line',
            data: {
                labels: realData.lorenz.empresas,
                datasets: [
                    {
                        label: 'Curva de Lorenz (Real)',
                        data: realData.lorenz.credito,
                        borderColor: '#D91023',
                        backgroundColor: 'rgba(217, 16, 35, 0.1)',
                        borderWidth: 4,
                        fill: true,
                        tension: 0.1,
                        pointBackgroundColor: '#D91023',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5
                    },
                    {
                        label: 'Linea de Igualdad Perfecta',
                        data: realData.lorenz.igualdad,
                        borderColor: '#17a2b8',
                        backgroundColor: 'transparent',
                        borderWidth: 3,
                        borderDash: [10, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: { size: 12, weight: 'bold' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#D91023',
                        borderWidth: 2,
                        callbacks: {
                            title: function(context) {
                                return `Percentil ${context[0].label}% de empresas`;
                            },
                            label: function(context) {
                                if (context.datasetIndex === 0) {
                                    return `Credito acumulado: ${context.parsed.y}%`;
                                } else {
                                    return 'Igualdad perfecta';
                                }
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Percentil acumulado de empresas (%)',
                            font: { size: 14, weight: 'bold' }
                        },
                        min: 0,
                        max: 100,
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Percentil acumulado de credito (%)',
                            font: { size: 14, weight: 'bold' }
                        },
                        min: 0,
                        max: 100,
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        status.textContent = 'Activo';
        status.className = 'chart-status';
        console.log('Curva de Lorenz creada');

    } catch (error) {
        console.error('Error creando Curva de Lorenz:', error);
        status.textContent = 'Error';
        status.className = 'chart-status error';
    }
}

function createSectorsPieChart() {
    const ctx = document.getElementById('sectorsPieChart');
    if (!ctx) return;

    const status = document.getElementById('sectors-pie-status');

    try {
        charts.sectorsPie = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: realData.sectores.labels,
                datasets: [{
                    data: realData.sectores.participacion,
                    backgroundColor: realData.sectores.colors,
                    borderWidth: 3,
                    borderColor: '#fff',
                    hoverBorderWidth: 5,
                    hoverBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: { size: 11, weight: 'bold' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#D91023',
                        borderWidth: 2,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed}% de empresas`;
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        status.textContent = 'Activo';
        status.className = 'chart-status';
        console.log('Grafico sectores pie creado');

    } catch (error) {
        console.error('Error creando grafico sectores:', error);
        status.textContent = 'Error';
        status.className = 'chart-status error';
    }
}

function createEfficiencyChart() {
    const ctx = document.getElementById('efficiencyChart');
    if (!ctx) return;

    const status = document.getElementById('efficiency-status');

    try {
        const allSectors = [...realData.sectores.labels, 'Mineria', 'Electricidad'];
        const allEfficiency = [...realData.sectores.eficiencia, 5.63, 4.50];
        const colors = allEfficiency.map(val =>
            val > 2.0 ? '#28a745' : val > 1.0 ? '#ffc107' : '#dc3545'
        );

        charts.efficiency = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: allSectors,
                datasets: [{
                    label: 'Ratio Eficiencia Crediticia',
                    data: allEfficiency,
                    backgroundColor: colors,
                    borderColor: colors.map(c => c.replace('0.7', '1')),
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#D91023',
                        borderWidth: 2,
                        callbacks: {
                            label: function(context) {
                                const val = context.parsed.x;
                                const interpretation = val > 2.0 ? '(MUY FAVORECIDO)' :
                                                    val > 1.0 ? '(FAVORECIDO)' : '(DESFAVORECIDO)';
                                return `Eficiencia: ${val.toFixed(2)}x ${interpretation}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ratio de Eficiencia (Credito/Empresas)',
                            font: { size: 12, weight: 'bold' }
                        },
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    y: {
                        grid: { display: false }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        status.textContent = 'Activo';
        status.className = 'chart-status';
        console.log('Grafico eficiencia creado');

    } catch (error) {
        console.error('Error creando grafico eficiencia:', error);
        status.textContent = 'Error';
        status.className = 'chart-status error';
    }
}

function createGeographyChart() {
    const ctx = document.getElementById('geographyChart');
    if (!ctx) return;

    const status = document.getElementById('geography-status');

    try {
        charts.geography = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: realData.departamentos.labels,
                datasets: [{
                    label: 'Monto Total (Millones S/)',
                    data: realData.departamentos.montos,
                    backgroundColor: realData.departamentos.colors(),
                    borderColor: realData.departamentos.colors().map(c => c.replace('0.8', '1')),
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#D91023',
                        borderWidth: 2,
                        callbacks: {
                            label: function(context) {
                                const special = context.label === 'Lima' ? ' (CONCENTRACION)' : '';
                                return `${context.label}: S/ ${context.parsed.y.toLocaleString()} millones${special}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Monto Total (Millones de Soles)',
                            font: { size: 12, weight: 'bold' }
                        },
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            font: { size: 10 }
                        },
                        grid: { display: false }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        status.textContent = 'Activo';
        status.className = 'chart-status';
        console.log('Grafico geografia creado');

    } catch (error) {
        console.error('Error creando grafico geografia:', error);
        status.textContent = 'Error';
        status.className = 'chart-status error';
    }
}

function createEntitiesChart() {
    const ctx = document.getElementById('entitiesChart');
    if (!ctx) return;

    const status = document.getElementById('entities-status');

    try {
        charts.entities = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: realData.entidades.labels,
                datasets: [{
                    data: realData.entidades.prestamos,
                    backgroundColor: realData.entidades.colors,
                    borderWidth: 3,
                    borderColor: '#fff',
                    hoverBorderWidth: 5,
                    hoverBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: { size: 10, weight: 'bold' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#D91023',
                        borderWidth: 2,
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${context.parsed.toLocaleString()} prestamos (${percentage}%)`;
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        status.textContent = 'Activo';
        status.className = 'chart-status';
        console.log('Grafico entidades creado');

    } catch (error) {
        console.error('Error creando grafico entidades:', error);
        status.textContent = 'Error';
        status.className = 'chart-status error';
    }
}

function createTicketChart() {
    const ctx = document.getElementById('ticketChart');
    if (!ctx) return;

    const status = document.getElementById('ticket-status');

    try {
        const colors = realData.entidades.tickets.map(ticket =>
            ticket > 300 ? '#D91023' : ticket > 50 ? '#ffc107' : '#28a745'
        );

        charts.ticket = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: realData.entidades.labels,
                datasets: [{
                    label: 'Ticket Promedio (Miles S/)',
                    data: realData.entidades.tickets,
                    backgroundColor: colors,
                    borderColor: colors.map(c => c.replace('0.8', '1')),
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#D91023',
                        borderWidth: 2,
                        callbacks: {
                            label: function(context) {
                                const category = context.parsed.y > 300 ? ' (CORPORATIVO)' :
                                               context.parsed.y > 50 ? ' (MEDIO)' : ' (MICRO)';
                                return `${context.label}: S/ ${context.parsed.y.toLocaleString()}${category}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ticket Promedio (Miles de Soles)',
                            font: { size: 12, weight: 'bold' }
                        },
                        grid: { color: 'rgba(0,0,0,0.1)' }
                    },
                    x: {
                        ticks: {
                            maxRotation: 45,
                            minRotation: 45,
                            font: { size: 10 }
                        },
                        grid: { display: false }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        status.textContent = 'Activo';
        status.className = 'chart-status';
        console.log('Grafico ticket creado');

    } catch (error) {
        console.error('Error creando grafico ticket:', error);
        status.textContent = 'Error';
        status.className = 'chart-status error';
    }
}

function createLimaChart() {
    const ctx = document.getElementById('limaChart');
    if (!ctx) return;

    const status = document.getElementById('lima-status');

    try {
        charts.lima = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: realData.lima.labels,
                datasets: [
                    {
                        label: 'Distribucion de Credito',
                        data: realData.lima.credito,
                        backgroundColor: ['#D91023', '#17a2b8'],
                        borderWidth: 4,
                        borderColor: '#fff'
                    },
                    {
                        label: 'Distribucion de Empresas',
                        data: realData.lima.empresas,
                        backgroundColor: ['rgba(217, 16, 35, 0.4)', 'rgba(23, 162, 184, 0.4)'],
                        borderWidth: 2,
                        borderColor: '#fff'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: { size: 11, weight: 'bold' }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        borderColor: '#D91023',
                        borderWidth: 2,
                        callbacks: {
                            label: function(context) {
                                const datasetLabel = context.datasetIndex === 0 ? 'Credito' : 'Empresas';
                                const inequity = context.label === 'Lima' && context.datasetIndex === 0 ? ' (CONCENTRACION 3.8x)' : '';
                                return `${datasetLabel} - ${context.label}: ${context.parsed}%${inequity}`;
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeInOutQuart'
                }
            }
        });

        status.textContent = 'Activo';
        status.className = 'chart-status';
        console.log('Grafico Lima creado');

    } catch (error) {
        console.error('Error creando grafico Lima:', error);
        status.textContent = 'Error';
        status.className = 'chart-status error';
    }
}

// Main initialization function
function initializeApp() {
    console.log('Inicializando aplicacion...');

    // Create all charts with error handling
    setTimeout(() => createLorenzChart(), 500);
    setTimeout(() => createSectorsPieChart(), 700);
    setTimeout(() => createEfficiencyChart(), 900);
    setTimeout(() => createGeographyChart(), 1100);
    setTimeout(() => createEntitiesChart(), 1300);
    setTimeout(() => createTicketChart(), 1500);
    setTimeout(() => createLimaChart(), 1700);

    console.log('Todos los graficos programados para cargar');
}

// Export functions
function exportJSON() {
    const data = {
        resumen_ejecutivo: {
            total_empresas: 501301,
            monto_total_soles: 57863748866,
            coeficiente_gini: 0.8805,
            concentracion_1_porciento: 46.4,
            inequidad_geografica: "Lima 3.8x mas que interior",
            sector_informal_pct: 98.7
        },
        hallazgos_criticos: [
            "1% de empresas controla 46.4% del credito",
            "Lima concentra 62.7% del credito con 30.6% de empresas",
            "MIBANCO: microfinanzas masivas vs Bancos: rescate corporativo",
            "98.7% empresas con RUCs atipicos (sector informal)",
            "Sectores menos afectados por COVID recibieron mas apoyo"
        ],
        fecha_exportacion: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reactiva_peru_analisis.json';
    link.click();
    URL.revokeObjectURL(url);

    console.log('Datos exportados en JSON');
}

function exportReport() {
    const report = `
REACTIVA PERU - REPORTE EJECUTIVO COMPLETO
==========================================

CIFRAS PRINCIPALES:
- Empresas beneficiadas: 501,301
- Monto total otorgado: S/ 57,863,748,866
- Monto promedio: S/ 115,428
- Coeficiente de Gini: 0.8805 (concentracion extrema)

HALLAZGOS CRITICOS:

1. CONCENTRACION EXTREMA DEL CREDITO
   - 1% de empresas controla 46.4% del credito total
   - 5% de empresas controla 74.8% del credito total
   - 50% de empresas mas pequenas solo accede al 2.3%

2. INEQUIDAD GEOGRAFICA BRUTAL
   - Lima: 30.6% empresas → 62.7% del credito
   - Resto del Peru: 69.4% empresas → 37.3% del credito
   - Ratio de inequidad: 3.8x a favor de Lima

3. DOS PROGRAMAS PARALELOS
   - MIBANCO: 255,671 prestamos micro (S/ 10,551 promedio)
   - Bancos Grandes: Rescate corporativo (S/ 400K+ promedio)

4. SECTORES PARADOJICOS
   - Mas favorecidos: Mineria (5.6x), Electricidad (4.5x)
   - Menos favorecidos: Restaurantes (0.6x), Comercio (0.8x)

5. ALCANCE DEL SECTOR INFORMAL
   - 98.7% empresas con RUCs atipicos
   - Evidencia de llegada masiva al sector informal

RECOMENDACIONES ESTRATEGICAS:
1. Implementar topes por empresa basados en facturacion
2. Crear cuotas geograficas obligatorias para provincias
3. Monitoreo en tiempo real de concentracion
4. Auditorias de focalizacion regulares

Fecha: ${new Date().toLocaleString()}
Fuente: Programa Reactiva Peru (501,301 empresas)
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reporte_reactiva_peru.txt';
    link.click();
    URL.revokeObjectURL(url);

    console.log('Reporte exportado');
}

function shareAnalysis() {
    if (navigator.share) {
        navigator.share({
            title: 'Peru Reactiva Analytics',
            text: 'Analisis completo de 501,301 empresas del Programa Reactiva Peru. Revelando patrones ocultos en el credito gubernamental.',
            url: window.location.href
        }).then(() => {
            console.log('Analisis compartido exitosamente');
        }).catch((error) => {
            console.log('Error compartiendo:', error);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

function fallbackShare() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('URL copiada al portapapeles');
        console.log('URL copiada para compartir');
    }).catch(() => {
        alert(`Comparte este enlace: ${url}`);
    });
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando aplicacion...');

    // Check if Chart.js loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js no se cargo correctamente');
        alert('Error: Chart.js no se pudo cargar. Verifica tu conexion a internet.');
        return;
    }

    console.log('Chart.js version:', Chart.version);

    // Initialize app
    initializeApp();
});

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Success message
console.log('Reactiva Peru Analytics cargado exitosamente');
console.log('Todos los graficos estan configurados para cargar');
console.log('Funciones de exportacion activas');