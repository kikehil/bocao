"use client";

import { Plus, Edit2, Trash2, Eye, EyeOff, Utensils } from "lucide-react";
import { useEffect, useState } from "react";

type MenuProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: "active" | "inactive";
};

export default function MenuEditorPage() {
  const [products, setProducts] = useState<MenuProduct[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("bocao_user");
    if (!storedUser) {
      setProducts([]);
      return;
    }

    const userData = JSON.parse(storedUser);
    const currentRestaurantId = userData.id || null;
    if (!currentRestaurantId) {
      setProducts([]);
      return;
    }

    const storedMenu = localStorage.getItem(`bocao_menu_${currentRestaurantId}`);
    if (storedMenu) {
      try {
        setProducts(JSON.parse(storedMenu));
      } catch (error) {
        console.error("Error parsing stored menu:", error);
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  }, []);

  const toggleProductStatus = (id: number) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              status: product.status === "active" ? "inactive" : "active",
            }
          : product
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Menu Editor</h1>
          <p className="text-slate-600 mt-1">
            Administra los productos de tu menú
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          Agregar Producto
        </button>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center">
          <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Utensils className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Tu menú está vacío.
          </h3>
          <p className="text-slate-500 mb-6">
            Agrega tu primer platillo para empezar a vender.
          </p>
          <button className="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Agregar Producto
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Imagen
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      product.status === "inactive" ? "opacity-60" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-slate-500 line-clamp-1">
                        {product.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-slate-700 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleProductStatus(product.id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {product.status === "active" ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Activo
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Inactivo
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-slate-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-slate-600">Total Productos</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">
            {products.length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-slate-600">Productos Activos</div>
          <div className="text-2xl font-bold text-green-600 mt-1">
            {products.filter((p) => p.status === "active").length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-slate-600">Productos Inactivos</div>
          <div className="text-2xl font-bold text-gray-600 mt-1">
            {products.filter((p) => p.status === "inactive").length}
          </div>
        </div>
      </div>
    </div>
  );
}






