import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions(){
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fetchTransactions() {
    const response = await fetch('http://localhost:3000/api/transactions');
    const data = await response.json();
    console.log(data);
    setTransactions(data);
  }
  
  useEffect(() => {
    fetchTransactions();
  }, []);

    return (
        <div>
            <Header/>
            <Summary/>
            
            <TransactionsContainer>
              <SearchForm/>
              <TransactionsTable>
                  <tbody>
                    {transactions.map(transaction => {
                      return (
                        <tr key={transaction.id}>
                          <td width="50%">{transaction.description}</td>
                          <td>
                            <PriceHighlight variant={transaction.type}>
                              {transaction.type === 'outcome' && '- '}
                              R$ {transaction.price.toFixed(2).replace('.', ',')}
                            </PriceHighlight>
                          </td>
                          <td>{transaction.category}</td>
                          <td>{new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))}</td>
                        </tr>
                      )
                    }
                  )}
                  </tbody>
              </TransactionsTable>
            </TransactionsContainer>
        </div>
    );
}