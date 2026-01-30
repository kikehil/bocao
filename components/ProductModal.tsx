"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ModifierOption {
  label: string;
  price: number;
}

interface Modifier {
  name: string;
  type: "radio" | "checkbox";
  required: boolean;
  options: ModifierOption[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  modifiers?: Modifier[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedModifiers, setSelectedModifiers] = useState<{
    [key: string]: string | string[];
  }>({});
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setSelectedModifiers({});
      setSpecialInstructions("");
      
      // Initialize required radio modifiers with first option
      if (product.modifiers) {
        const initialModifiers: { [key: string]: string | string[] } = {};
        product.modifiers.forEach((modifier) => {
          if (modifier.type === "radio" && modifier.required && modifier.options.length > 0) {
            initialModifiers[modifier.name] = modifier.options[0].label;
          } else if (modifier.type === "checkbox") {
            initialModifiers[modifier.name] = [];
          }
        });
        setSelectedModifiers(initialModifiers);
      }
    }
  }, [product]);

  if (!product || !isOpen) return null;

  const handleModifierChange = (modifierName: string, value: string, type: "radio" | "checkbox") => {
    setSelectedModifiers((prev) => {
      if (type === "radio") {
        return { ...prev, [modifierName]: value };
      } else {
        const current = (prev[modifierName] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        return { ...prev, [modifierName]: updated };
      }
    });
  };

  const calculateTotalPrice = () => {
    let total = product.price;

    // Add modifier prices
    if (product.modifiers) {
      product.modifiers.forEach((modifier) => {
        if (modifier.type === "radio") {
          const selected = selectedModifiers[modifier.name] as string;
          if (selected) {
            const option = modifier.options.find((opt) => opt.label === selected);
            if (option) total += option.price;
          }
        } else if (modifier.type === "checkbox") {
          const selected = (selectedModifiers[modifier.name] as string[]) || [];
          selected.forEach((label) => {
            const option = modifier.options.find((opt) => opt.label === label);
            if (option) total += option.price;
          });
        }
      });
    }

    return total * quantity;
  };

  const handleAddToCart = () => {
    // Validate required modifiers
    if (product.modifiers) {
      const missingRequired = product.modifiers.some(
        (modifier) =>
          modifier.required &&
          (!selectedModifiers[modifier.name] ||
            (modifier.type === "checkbox" &&
              (selectedModifiers[modifier.name] as string[]).length === 0))
      );

      if (missingRequired) {
        alert("Por favor selecciona todas las opciones requeridas");
        return;
      }
    }

    const cartItem = {
      id: `${product.id}-${Date.now()}-${Math.random()}`,
      productId: product.id,
      name: product.name,
      price: calculateTotalPrice() / quantity, // Price per unit
      quantity,
      image: product.image,
      modifiers: selectedModifiers,
      specialInstructions: specialInstructions.trim() || undefined,
    };

    addItem(cartItem);
    onClose();
  };

  const totalPrice = calculateTotalPrice();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } md:bottom-auto md:top-1/2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:max-w-lg md:w-full md:max-h-[85vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-48 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* Product Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{product.name}</h2>
            <p className="text-slate-500 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
          </div>

          {/* Modifiers */}
          {product.modifiers && product.modifiers.length > 0 && (
            <div className="space-y-6 mb-6">
              {product.modifiers.map((modifier) => (
                <div key={modifier.name}>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {modifier.name}
                    {modifier.required && (
                      <span className="text-primary ml-1">*</span>
                    )}
                  </h3>

                  {modifier.type === "radio" ? (
                    <div className="space-y-2">
                      {modifier.options.map((option) => (
                        <label
                          key={option.label}
                          className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                            selectedModifiers[modifier.name] === option.label
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name={modifier.name}
                              value={option.label}
                              checked={selectedModifiers[modifier.name] === option.label}
                              onChange={(e) =>
                                handleModifierChange(modifier.name, e.target.value, "radio")
                              }
                              className="w-4 h-4 text-primary"
                            />
                            <span className="text-slate-900">{option.label}</span>
                          </div>
                          {option.price > 0 && (
                            <span className="text-slate-600 font-medium">
                              +${option.price.toFixed(2)}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {modifier.options.map((option) => (
                        <label
                          key={option.label}
                          className={`flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                            (selectedModifiers[modifier.name] as string[])?.includes(option.label)
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={(selectedModifiers[modifier.name] as string[])?.includes(
                                option.label
                              )}
                              onChange={(e) =>
                                handleModifierChange(modifier.name, option.label, "checkbox")
                              }
                              className="w-4 h-4 text-primary rounded"
                            />
                            <span className="text-slate-900">{option.label}</span>
                          </div>
                          {option.price > 0 && (
                            <span className="text-slate-600 font-medium">
                              +${option.price.toFixed(2)}
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Special Instructions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">
              Instrucciones Especiales
            </h3>
            <textarea
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Ej: Sin mayonesa, sin cebolla, bien cocido..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg resize-none focus:outline-none focus:border-primary text-slate-900"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-slate-900">Cantidad</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-5 h-5 text-slate-700" />
              </button>
              <span className="text-xl font-bold text-slate-900 w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-full border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors"
          >
            Agregar al Pedido - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </>
  );
}
