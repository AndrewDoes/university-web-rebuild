import { ChevronRight } from 'lucide-react'
import React from 'react'

const HistoryFooter = () => {
    return (
        <div>
            <div className="bg-muted py-20 border-y border-border">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-6 uppercase tracking-tighter">
                        Menjadi Bagian dari Sejarah Baru
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-10 italic">
                        STTB terus melangkah maju dengan visi yang sama: menghadirkan Injil seutuhnya di tengah masyarakat urban.
                    </p>
                    <a
                        href="/admission"
                        className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-[10px] hover:bg-blue-900 transition-all shadow-xl shadow-primary/10 group no-underline"
                    >
                        Gabung Bersama Kami
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform text-secondary" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HistoryFooter
