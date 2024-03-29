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
        //@ts-ignore
        const userId = session?.namespaces?.authentication?.storeUserId?.value;
        //@ts-ignore
        const linkerId = session?.namespaces?.profile?.document?.value;

        const dataUser = await fetch(
          `/usersById/${userId}`,
          {
            method: "GET",
            mode: "no-cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
          }
        );

        const userData: User = await dataUser.json();

        setUser(userData)

        if (userData.nivel.includes('1')) {
          setUserLevel(1)
        }
        if (userData.nivel.includes('2')) {
          setUserLevel(2)
        }
        if (userData.nivel.includes('3')) {
          setUserLevel(3)
        }

        setStatus(userData.isLinker)

        if (userData.linkerType === 'Tendero' || userData.linkerType === 'Cangu') {
          setIsShopkeeper(true)
        }

        setSummary({
          createdIn: userData.createdIn,
          ganancia: userData.ganancia,
          linkerId: userData.linkerId,
          linkQR: userData.linkQR,
          updatedIn: userData.updatedIn,
          linkerType:userData.linkerType,
          phone:userData.homePhone
        })

        const profits = await fetch(
          `/profitsByIdLinker/${linkerId}`,
          {
            method: "GET",
            mode: "no-cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
          }
        );

        const profitsUser = await profits.json();

        if (!profitsUser.message) {
          if (profitsUser.length) {
            setProfits(profitsUser)
          }
        }

        const getLevels = await fetch(
          `/levelsLinker`,
          {
            method: "GET",
            mode: "no-cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
          }
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
