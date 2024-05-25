let datable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    datable = $('#tblDatos').DataTable({
        "ajax": {
            "url":"/admin/Usuario/ObtenerTodos"
        },
        "columns": [
            { "data": "email" },
            { "data": "nombres" },
            { "data": "apellidos" },
            { "data": "phoneNumber" },
            { "data": "role" },
            {
                "data": {
                    id:"id",lockoutEnd:"lockoutEnd"
                },
                "render": function (data) {
                    let hoy = new Date().getTime();
                    let bloqueo = new Date(data.lockoutEnd).getTime();
                    if (bloqueo > hoy)
                    {
                        //usuario bloqueado
                        return `
                            <div class="text-center">
                                <a onclick=BloquearDesbloquear('${data.id}')
                                    class="btn btn-danger text-white" style="cursor:pointer;" width:150px>
                                    <i class="bi bi-unlock-fill"></i>
                                    Desbloquear
                                </a>
                            </div>
                        `;
                    }
                    else
                    {
                        //usuario desbloqueado
                        return `
                            <div class="text-center">
                                <a onclick=BloquearDesbloquear('${data.id}')
                                    class="btn btn-success text-white" style="cursor:pointer;" width:150px>
                                    <i class="bi bi-lock-fill"></i>
                                    Bloquear
                                </a>
                            </div>
                        `;
                    }
                }
            }
        ],
        language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        }
    });
}

function BloquearDesbloquear(id) {
    $.ajax({
        type: "POST",
        url: '/Admin/Usuario/BloquearDesbloquear',
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                datable.ajax.reload();
            } else {
                toastr.error(data.message);
            }
        }
    });
}