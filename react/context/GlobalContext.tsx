import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRenderSession } from "vtex.session-client";



const GlobalContext = createContext<GlobalContextProps | null>(null)

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useRenderSession();

  const [loading, setLoading] = useState<boolean>(false);
  const [levels, setLevels] = useState<Level[]>([]);
  const [userLevel, setUserLevel] = useState<number>(0);
  const [isShopkeeper, setIsShopkeeper] = useState<boolean>(false);
  const [profits, setProfits] = useState<Profits[]>([]);
  const [user, setUser] = useState<User>();
  const [summary, setSummary] = useState<Summary>();
  const [status, setStatus] = useState<boolean>(false);
  const [minProfits] = useState<number>(250000);
  const [maxProfits] = useState<number>(1000000);

  useEffect(() => {
    (async function () {
      if (session) {
        setLoading(true)
        const userId = session?.namespaces?.authentication?.storeUserId?.value;

        const linkerId = session?.namespaces?.profile?.document?.value;

        const dataUser = await fetch(
          `https://carlosgiovanny--ventadirectanewqa.myvtex.com/usersById/${userId}`
        );

        const userData: User = await dataUser.json();

        setUser(userData)

        setUserLevel(Number(userData.nivel))

        setStatus(userData.isLinker)

        if (userData.linkerType === 'Tendero') {
          setIsShopkeeper(true)
        }

        setSummary({
          createdIn: userData.createdIn,
          ganancia: userData.ganancia,
          linkerId: userData.linkerId,
          linkQR: userData.linkQR,
          updatedIn: userData.updatedIn,
          linkerType:userData.linkerType
        })

        const profits = await fetch(
          `https://carlosgiovanny--ventadirectanewqa.myvtex.com/profitsByIdLinker/${linkerId}`
        );

        const profitsUser = await profits.json();

        if (profitsUser.length) {
          setProfits(profitsUser)
        }

        const getLevels = await fetch(
          'https://carlosgiovanny--ventadirectanewqa.myvtex.com/levelsLinker'
        );

        const dataLevels: Array<Level> = await getLevels.json();
        setLevels(dataLevels)

        setLoading(false)
      }
    })()

  }, [session])


  const value = useMemo(() => {
    return {
      loading,
      levels,
      userLevel,
      isShopkeeper,
      profits,
      user,
      summary,
      status,
      minProfits,
      maxProfits,
    }
  }, [
    loading,
    levels,
    userLevel,
    isShopkeeper,
    profits,
    user,
    summary,
    status,
  ])

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

const useGlobalContext = () => {
  const context = useContext(GlobalContext) as GlobalContextProps

  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider')
  }

  return context
}

export {
  GlobalProvider,
  useGlobalContext
}