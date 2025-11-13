import { motion, AnimatePresence } from "framer-motion";

type AnimatedCounterProps = {
    value: string | number;
    duration?: number;
    className?: string;
};

export function AnimatedCounter({
    value,
    duration = 0.15,
    className,
}: AnimatedCounterProps) {
    const formatted =
        typeof value === "number"
            ? value.toLocaleString("en-US")
            : value;

    return (
        <div className={`flex gap-0.5 ${className}`}>
            {formatted.split("").map((char, i) =>
                /\d/.test(char) ? (
                    <Digit key={i} value={char} duration={duration} />
                ) : (
                    <Punctuation key={i} value={char} duration={duration} />
                )
            )}
        </div>
    );
}

function Digit({ value, duration }: { value: string; duration: number }) {
    return (
        <div className="relative w-[1ch] h-[1em] overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={value}
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "100%", opacity: 0 }}
                    transition={{ duration, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {value}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function Punctuation({
    value,
    duration,
}: {
    value: string;
    duration: number;
}) {
    return (
        <div className="relative w-[1ch] h-[1em] overflow-hidden">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={value}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {value}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
