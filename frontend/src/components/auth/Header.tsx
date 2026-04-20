const Header = ({ title, description }: { title: string, description: string }) => {
  return <div className="flex flex-col justify-center items-center gap-3 py-4">
    <h2 className="text-3xl text-primary font-bold">{title}</h2>
    <p>{description}</p>
  </div>
}

export default Header;
