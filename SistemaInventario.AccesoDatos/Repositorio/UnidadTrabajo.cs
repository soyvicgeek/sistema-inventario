using SistemaInventario.AccesoDatos.Data;
using SistemaInventario.AccesoDatos.Repositorio.IRepositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaInventario.AccesoDatos.Repositorio
{
    public class UnidadTrabajo : IUnidadTrabajo
    {
        private readonly ApplicationDbContext _db;
        public IBodegaRepositorio Bodega { get; set; }
        public ICategoriaRepositorio Categoria { get; set; }
        public IMarcaRepositorio Marca { get; set; }
        public IProductoRepositorio Producto { get; set; }
        public IUsuarioAplicacionRepositorio UsuarioAplicacion { get; set; }
        public IBodegaProductoRepositorio BodegaProducto { get; set; }
        public IInventarioRepositorio Inventario { get; set; }
        public IInventarioDetalleRepositorio InventarioDetalle { get; set; }
        public IKardexInventarioRepositorio KardexInventario { get; private set; }

        public UnidadTrabajo(ApplicationDbContext db)
        {
            _db = db;
            Bodega = new BodegaRepositorio(_db);
            Categoria = new CategoriaRepositorio(_db);
            Marca = new MarcaRepositorio(_db);
            Producto = new ProductoRepositorio(_db);
            UsuarioAplicacion = new UsuarioAplicacionRepositorio(_db);
            BodegaProducto = new BodegaProductoRepositorio(_db);
            Inventario = new InventarioRepositorio(_db);
            InventarioDetalle = new InventarioDetalleRepositorio(_db);
            KardexInventario = new KardexInventarioRepositorio(_db);
        }

        public void Dispose()
        {
            _db.Dispose();
        }

        public async Task Guardar()
        {
            await _db.SaveChangesAsync();
        }
    }
}
