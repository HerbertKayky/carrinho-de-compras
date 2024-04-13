const Cart = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">Meu carrinho</h1>

      <section className="flex items-center justify-between border-b-2 border-gray-300">
        <img
          className="w-28"
          src="https://i.zst.com.br/thumbs/12/b/18/1457943551.jpg"
          alt="Logo do produto"
        />

        <strong>Preço: R$19,98</strong>
        <div className="flex items-center justify-center gap-3">
          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            -
          </button>
          1
          <button className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center">
            +
          </button>
        </div>

        <strong className="float-right">SubTotal: R$19,98</strong>
      </section>

      <p className="font-bold mt-4">Total: R$19,98</p>
    </div>
  );
};

export default Cart;
