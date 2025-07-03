const si = require('systeminformation');

async function reconhecerHardware() {
    const cpu = await si.cpu();
    const mem = await si.mem();
    const disk = await si.diskLayout();
    const gpu = await si.graphics();

    return {
        processador: `${cpu.manufacturer} ${cpu.brand}`,
        ram: `${(mem.total / 1073741824).toFixed(1)} GB`,
        armazenamento: disk.map(d => `${d.name} ${(d.size / 1073741824).toFixed(1)} GB`).join(', '),
        placaVideo: gpu.controllers.map(g => g.model).join(', ')
    };
}

module.exports = { reconhecerHardware };
