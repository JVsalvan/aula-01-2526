import Footer from "@/app/components/Footer"
import Header from "@/app/components/Header"

export default function SisitemaLayout({
    children
}:{
    children:React.ReactNode
}){
    return(
             
            <div className="flex min-h-screen flex-col">
              
              {/* Se sua Sidebar for fixa/lateral, ela fica fora do fluxo flex-col do main, 
                  mas aqui vamos assumir a estrutura que você mandou */}
              {/* <Sidebar /> */}
    
              {/* O invólucro do conteúdo principal */}
              <div className="flex flex-1 flex-col">
                
                <Header />
    
                {/* O flex-1 aqui faz o main "esticar" para empurrar o footer */}
                <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
                  <div className="w-full max-w-7xl">
                    {children}
                  </div>
                </main>
    
                <Footer/>
              </div>
    
            </div>

    )
     
       
         
}