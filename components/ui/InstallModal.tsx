"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Share, MoreVertical, PlusSquare, Download } from "lucide-react";
import { GlassCard } from "./GlassCard";

interface InstallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function InstallModal({ isOpen, onClose }: InstallModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-md"
                        >
                            <GlassCard className="relative p-0 overflow-hidden" noHover>
                                <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white sticky top-0 z-10">
                                    <h3 className="font-semibold text-lg text-black">Instalar Aplicación</h3>
                                    <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                                        <X size={20} className="text-black/60" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                                    {/* Android */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-emerald-600 mb-2">
                                            <div className="p-2 bg-emerald-50 rounded-lg">
                                                <Download size={20} />
                                            </div>
                                            <span className="font-medium text-black">Android (Chrome)</span>
                                        </div>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600 ml-1">
                                            <li>Abre el menú del navegador (<MoreVertical size={14} className="inline mx-1" />)</li>
                                            <li>Selecciona <span className="font-semibold text-neutral-900">"Instalar aplicación"</span></li>
                                            <li>Confirma la instalación en la ventana emergente</li>
                                        </ol>
                                    </div>

                                    {/* iOS */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-blue-600 mb-2">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <Share size={20} />
                                            </div>
                                            <span className="font-medium text-black">iPhone (Safari)</span>
                                        </div>
                                        <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600 ml-1">
                                            <li>Toca el botón compartir (<Share size={14} className="inline mx-1" />)</li>
                                            <li>Desliza hacia arriba y selecciona <span className="font-semibold text-neutral-900">"Añadir a inicio"</span> (<PlusSquare size={14} className="inline mx-1" />)</li>
                                            <li>Toca "Añadir" en la esquina superior derecha</li>
                                        </ol>
                                    </div>

                                    <div className="p-4 bg-neutral-50 rounded-xl text-xs text-neutral-500 text-center">
                                        La aplicación no ocupa espacio de almacenamiento y se actualiza automáticamente.
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
