function Layout({children}: {children : React.ReactNode}) {
  return (
    <div className="h1-full bg-red-500">
        {children}
    </div>
  )
}

export default Layout