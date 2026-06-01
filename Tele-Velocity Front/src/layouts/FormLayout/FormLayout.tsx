import "./FormLayout.css";

interface FormLayoutProps {
    children: React.ReactNode;
}

/**
 * Uniwersalny layout formularza używany
 * do tworzenia ekranów z polami wejściowymi.
 * 
 * Elementy `p` oraz `a` posiadają już domyślne style
 * zdefiniowane w pliku FormLayout.css.
 */
function FormLayout({
    children,
}: FormLayoutProps) {
    return (
        <div className="FormLayout">
            {children}
        </div>
    );
}

export default FormLayout;