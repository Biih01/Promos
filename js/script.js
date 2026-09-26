(() => {
	"use strict";

	const products = Array.isArray(window.PRODUTOS) ? window.PRODUTOS : [];
	const grid = document.querySelector("#product-grid");
	const filterRow = document.querySelector("#filter-row");
	const searchInput = document.querySelector("#search-input");
	const sortSelect = document.querySelector("#sort-select");
	const countLabel = document.querySelector("#results-count");
	const emptyState = document.querySelector("#empty-state");
	const dialog = document.querySelector("#product-dialog");
	const dialogContent = document.querySelector("#dialog-content");
	const toast = document.querySelector("#toast");
	let activeSource = "Todas as lojas";
	let toastTimer;

	const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
		"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
	})[character]);
	const validUrl = (value) => {
		try {
			const url = new URL(value);
			return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
		} catch {
			return "";
		}
	};
	const validImageSource = (value) => {
		if (typeof value !== "string" || !value.trim()) return "";
		if (value.startsWith("img/") || value.startsWith("./img/") || value.startsWith("/")) return value;
		return validUrl(value);
	};
	const productImage = (product) => validImageSource(`img/${product.id}.${product.imageExtension || "jpeg"}`);
	const formatPrice = (price) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(price) || 0);

	function createFilters() {
		const sources = ["Todas as lojas", ...new Set(products.map((product) => product.source).filter(Boolean))];
		filterRow.replaceChildren();
		sources.forEach((source) => {
			const button = document.createElement("button");
			button.type = "button";
			button.className = `filter-chip${source === activeSource ? " active" : ""}`;
			button.textContent = source;
			button.setAttribute("aria-pressed", String(source === activeSource));
			button.addEventListener("click", () => {
				activeSource = source;
				createFilters();
				renderProducts();
			});
			filterRow.append(button);
		});
	}

	function filteredProducts() {
		const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
		const matching = products.filter((product) => {
			const searchable = [product.name, product.description, product.source, product.category].join(" ").toLocaleLowerCase("pt-BR");
			return (activeSource === "Todas as lojas" || product.source === activeSource) && searchable.includes(query);
		});
		switch (sortSelect.value) {
			case "price-asc": matching.sort((a, b) => a.price - b.price); break;
			case "price-desc": matching.sort((a, b) => b.price - a.price); break;
			case "name": matching.sort((a, b) => a.name.localeCompare(b.name, "pt-BR")); break;
			default: break;
		}
		return matching;
	}

	function renderProducts() {
		const visibleProducts = filteredProducts();
		grid.replaceChildren();
		countLabel.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "achadinho" : "achadinhos"} encontrado${visibleProducts.length === 1 ? "" : "s"}`;
		emptyState.hidden = visibleProducts.length !== 0;

		visibleProducts.forEach((product) => {
			const card = document.createElement("article");
			card.className = "product-card";
			const image = productImage(product);
			card.innerHTML = `
				<a class="card-image-wrap" href="#produto-${escapeHtml(product.id)}" aria-label="Ver detalhes de ${escapeHtml(product.name)}">
					${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(product.name)}" loading="lazy">` : ""}
					<span class="store-label">${escapeHtml(product.source)}</span>
					${product.badge ? `<span class="product-badge">${escapeHtml(product.badge)}</span>` : ""}
				</a>
				<div class="card-body">
					<p class="product-category">${escapeHtml(product.category)}</p>
					<h3 class="product-title">${escapeHtml(product.name)}</h3>
					<p class="product-description">${escapeHtml(product.description)}</p>
					<div class="price-row">
						<div>${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}<strong class="product-price">${formatPrice(product.price)}</strong><span class="price-installment">à vista*</span></div>
						<a class="card-arrow" href="#produto-${escapeHtml(product.id)}" aria-label="Ver detalhes de ${escapeHtml(product.name)}">↗</a>
					</div>
				</div>`;
			card.querySelectorAll(".card-image-wrap, .card-arrow").forEach((link) => link.addEventListener("click", (event) => {
				event.preventDefault();
				openProduct(product);
			}));
			grid.append(card);
		});
	}

	function openProduct(product) {
		const image = productImage(product);
		const affiliateUrl = validUrl(product.affiliateUrl);
		dialogContent.innerHTML = `
			${image ? `<img class="dialog-image" src="${escapeHtml(image)}" alt="${escapeHtml(product.name)}">` : `<div class="dialog-image"></div>`}
			<div class="dialog-info">
				<span class="store-label">${escapeHtml(product.source)}</span>
				<p class="product-category">${escapeHtml(product.category)}</p>
				<h2 id="dialog-title">${escapeHtml(product.name)}</h2>
				<p class="dialog-description">${escapeHtml(product.description)}</p>
				${product.oldPrice ? `<span class="price-old">De ${formatPrice(product.oldPrice)}</span>` : ""}
				<p class="dialog-price">${formatPrice(product.price)}</p>
				${affiliateUrl ? `<a class="button button-dark dialog-cta" href="${escapeHtml(affiliateUrl)}" target="_blank" rel="noopener noreferrer">Quero realizar compra <span aria-hidden="true">↗</span></a>` : `<button class="button button-dark dialog-cta" type="button" disabled>Link de compra indisponível</button>`}
				<p class="dialog-disclaimer">Você será direcionado para a loja parceira. Preço, estoque, pagamento, entrega e suporte são de responsabilidade do vendedor.</p>
			</div>`;
		if (typeof dialog.showModal === "function") dialog.showModal();
		else dialog.setAttribute("open", "");
	}

	document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
	dialog.addEventListener("click", (event) => {
		if (event.target === dialog) dialog.close();
	});
	searchInput.addEventListener("input", renderProducts);
	sortSelect.addEventListener("change", renderProducts);
	document.querySelector("#clear-filters").addEventListener("click", () => {
		searchInput.value = "";
		activeSource = "Todas as lojas";
		createFilters();
		renderProducts();
	});
	document.querySelector("#current-year").textContent = new Date().getFullYear();
	document.addEventListener("keydown", (event) => {
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
			event.preventDefault();
			searchInput.focus();
		}
		if (event.key === "Escape" && dialog.open) dialog.close();
	});

	createFilters();
	renderProducts();
})();

