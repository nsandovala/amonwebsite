'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this exists, verify later or use clsx/tailwind-merge directly if needed

interface MeetingRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type OrgType = 'Municipalidad' | 'Centro Médico' | 'Farmacia' | 'Prensa' | 'Inversor' | 'Otro';

const ORG_TYPES: OrgType[] = ['Municipalidad', 'Centro Médico', 'Farmacia', 'Prensa', 'Inversor', 'Otro'];

export default function MeetingRequestModal({ isOpen, onClose }: MeetingRequestModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        orgType: '' as OrgType | '',
        org: '',
        role: '',
        message: '',
    });

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const response = await fetch('/api/meeting-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => {
                    onClose();
                    setSubmitStatus('idle');
                    setFormData({ name: '', email: '', orgType: '', org: '', role: '', message: '' });
                }, 2000);
            } else {
                setSubmitStatus('error');
                setErrorMessage(data.error || 'Something went wrong');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Error de conexión. Por favor reintenta.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-lg bg-neutral-50/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden relative"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-neutral-200/50">
                                <h2 className="text-xl font-medium tracking-tight text-neutral-900">Solicitar reunión</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 -mr-2 text-neutral-500 hover:text-neutral-900 transition-colors rounded-full hover:bg-neutral-200/50"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                {submitStatus === 'success' ? (
                                    <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-medium text-neutral-900">¡Solicitud enviada!</h3>
                                        <p className="text-neutral-600">Nos pondremos en contacto contigo pronto.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-700">Nombre *</label>
                                                <input
                                                    required
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-neutral-400"
                                                    placeholder="Tu nombre"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-700">Email *</label>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-neutral-400"
                                                    placeholder="nombre@empresa.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-700">Tipo de Organización</label>
                                                <select
                                                    name="orgType"
                                                    value={formData.orgType}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-neutral-700"
                                                >
                                                    <option value="">Seleccionar...</option>
                                                    {ORG_TYPES.map((type) => (
                                                        <option key={type} value={type}>
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-neutral-700">Organización</label>
                                                <input
                                                    name="org"
                                                    value={formData.org}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-neutral-400"
                                                    placeholder="Empresa / Entidad"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-neutral-700">Cargo</label>
                                            <input
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-neutral-400"
                                                placeholder="Ej: Director de Innovación"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-neutral-700">Mensaje (Opcional)</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full px-4 py-2 bg-white/50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all placeholder:text-neutral-400 resize-none"
                                                placeholder="¿En qué podemos ayudarte?"
                                            />
                                        </div>

                                        {submitStatus === 'error' && (
                                            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                                <div className="flex flex-col gap-1">
                                                    <p>{errorMessage}</p>
                                                    <a
                                                        href="mailto:amon360.cl@gmail.com"
                                                        className="underline font-medium hover:text-red-700"
                                                    >
                                                        Contactar por correo
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={cn(
                                                    "w-full py-3 px-4 rounded-xl text-white font-medium transition-all shadow-lg shadow-blue-500/20",
                                                    isSubmitting
                                                        ? "bg-neutral-400 cursor-not-allowed"
                                                        : "bg-neutral-900 hover:bg-neutral-800 hover:shadow-blue-500/30 hover:-translate-y-0.5"
                                                )}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center gap-2">
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Enviando...
                                                    </span>
                                                ) : (
                                                    "Enviar Solicitud"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
