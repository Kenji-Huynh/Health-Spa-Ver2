document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.querySelector(".register-btn");

  if (registerBtn) {
    registerBtn.addEventListener("click", function () {
      // You can replace this with your actual registration logic
      alert("Cảm ơn bạn đã đăng ký ưu đãi!");
      // Or redirect to registration page
      // window.location.href = 'register.html';
    });
  }

  // Reset animations on every page load
  // First, make sure all items are hidden
  document.querySelectorAll(".promo-features li").forEach(function (item) {
    item.style.opacity = "0";
  });

  // Force a reflow to ensure animations will play again
  void document.querySelector(".promo-features").offsetWidth;

  // Then remove the 'style' attribute to let CSS animations take over
  setTimeout(function () {
    document.querySelectorAll(".promo-features li").forEach(function (item) {
      item.removeAttribute("style");
    });
  }, 50);

  // Cập nhật JavaScript để xử lý hover cho toàn bộ nhóm
  const serviceCircles = document.querySelector(".service-circles");
  if (serviceCircles) {
    // Dừng animation khi hover vào bất kỳ item nào
    serviceCircles.addEventListener("mouseenter", () => {
      serviceCircles.style.animationPlayState = "paused";
    });

    // Tiếp tục animation khi bỏ hover
    serviceCircles.addEventListener("mouseleave", () => {
      serviceCircles.style.animationPlayState = "running";
    });

    // Thêm class cho container
    serviceCircles.classList.add("carousel-container");

    // Tạo container con để chứa các items gốc và bản sao
    const innerContainer = document.createElement("div");
    innerContainer.className = "service-circles-inner";

    // Lấy tất cả items hiện tại
    const serviceItems = serviceCircles.querySelectorAll(".service-item");

    // Đưa tất cả items vào container con
    serviceItems.forEach((item) => {
      innerContainer.appendChild(item);
    });

    // Nhân đôi các item để tạo hiệu ứng vô tận
    serviceItems.forEach((item) => {
      const clone = item.cloneNode(true);
      innerContainer.appendChild(clone);
    });

    // Thay thế nội dung gốc bằng container mới có các items đã được nhân đôi
    serviceCircles.innerHTML = "";
    serviceCircles.appendChild(innerContainer);
  }

  // Service cards hover effects
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.opacity = "1";
    });

    card.addEventListener("mouseleave", () => {
      card.style.opacity = "0.85";
    });

    // Optional: Add click functionality
    card.addEventListener("click", () => {
      // You can add functionality here, such as redirecting to service detail page
      // window.location.href = 'service-detail.html';
      console.log(
        "Service clicked:",
        card.querySelector(".service-title").textContent
      );
    });
  });

  // Xử lý hiệu ứng hover cho các stat items
  const statItems = document.querySelectorAll(".stat-item");

  statItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const iconWrapper = item.querySelector(".stat-icon-wrapper");
      // Reset animation
      iconWrapper.style.animation = "none";

      // Trigger reflow
      void iconWrapper.offsetWidth;

      // Start animation
      iconWrapper.style.animation = "spinIcon 1.2s ease";
    });

    item.addEventListener("mouseleave", () => {
      const iconWrapper = item.querySelector(".stat-icon-wrapper");
      iconWrapper.style.animation = "none";
      iconWrapper.style.transform = "translateY(0)";
    });
  });

  // Tạo hiệu ứng vật rơi cho spa-environment
  createFallingObjects();

  // Điều chỉnh tốc độ rơi nhanh hơn
  function createFallingObjects() {
    const container = document.querySelector(".falling-objects-container");
    if (!container) return;

    // Xóa tất cả lá hiện tại để tạo mới
    container.innerHTML = "";

    // Số lượng đối tượng rơi
    const objectCount = 30;

    // Tính toán chiều rộng của container
    const containerWidth = container.offsetWidth;

    // Tạo các đối tượng rơi mới
    for (let i = 0; i < objectCount; i++) {
      // Quyết định loại đối tượng (lá hoặc hình tròn)
      const isLeaf = Math.random() > 0.3; // 70% là lá

      // Tạo element mới
      const object = document.createElement("div");
      object.className = isLeaf ? "falling-object leaf" : "falling-object";

      // Thiết lập vị trí và kích thước ngẫu nhiên
      const size = isLeaf ? Math.random() * 20 + 15 : Math.random() * 15 + 5;
      const xPos = Math.random() * containerWidth;

      // Thiết lập style
      object.style.width = `${size}px`;
      object.style.height = `${size}px`;
      object.style.left = `${xPos}px`;

      // Đặt vị trí ban đầu ngẫu nhiên ngoài màn hình phía trên
      // Đảm bảo không có lá nào bị kẹt ở trên cùng
      const startPos = -Math.random() * 200 - 50; // Từ -50px đến -250px (ngoài màn hình)
      object.style.top = `${startPos}px`;

      // Thiết lập thời gian animation ngẫu nhiên (15-25 giây) - để rơi chậm hơn
      const duration = Math.random() * 10 + 15;
      object.style.animationDuration = `${duration}s`;

      // Tạo độ trễ ngẫu nhiên để các đối tượng không xuất hiện cùng lúc
      const delay = Math.random() * 15;
      object.style.animationDelay = `${delay}s`;

      // LOẠI BỎ hướng xoay ngược
      // Không sử dụng animationDirection = "reverse" nữa

      // Thêm vào container
      container.appendChild(object);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const servicesGrid = document.querySelector(".services-grid");
  const serviceCards = document.querySelectorAll(".service-card");
  const prevButton = document.querySelector(".nav-prev");
  const nextButton = document.querySelector(".nav-next");

  // Biến theo dõi
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let previousTranslate = 0;
  let currentIndex = 0;
  let cardWidth = 0;

  // Tính toán cardWidth
  function calculateCardWidth() {
    if (serviceCards.length > 0) {
      // Lấy chiều rộng thực tế của card + gap
      const firstCardRect = serviceCards[0].getBoundingClientRect();
      const secondCardRect = serviceCards[1]
        ? serviceCards[1].getBoundingClientRect()
        : null;

      if (secondCardRect) {
        // Khoảng cách giữa card thứ nhất và thứ hai
        cardWidth = secondCardRect.left - firstCardRect.left;
      } else {
        // Nếu chỉ có một card
        cardWidth = firstCardRect.width;
      }
    }
  }

  // Khởi tạo
  calculateCardWidth();
  window.addEventListener("resize", calculateCardWidth);

  // Số lượng card hiển thị cùng lúc (mặc định là 4)
  function getVisibleCardCount() {
    return 4; // Luôn hiển thị 4 card
  }

  // Xử lý sự kiện kéo thả
  function dragStart(event) {
    event.preventDefault();

    if (event.type === "touchstart") {
      startPosition = event.touches[0].clientX;
    } else {
      startPosition = event.clientX;
    }

    isDragging = true;
    servicesGrid.style.transition = "none"; // Tắt transition khi kéo
    servicesGrid.style.cursor = "grabbing";
  }

  function dragMove(event) {
    if (!isDragging) return;

    let currentPosition;
    if (event.type === "touchmove") {
      currentPosition = event.touches[0].clientX;
    } else {
      currentPosition = event.clientX;
    }

    const diff = currentPosition - startPosition;
    currentTranslate = previousTranslate + diff;

    // Giới hạn kéo
    const maxTranslate = 0;
    const minTranslate =
      -cardWidth * (serviceCards.length - getVisibleCardCount());

    if (currentTranslate > maxTranslate) {
      currentTranslate = maxTranslate;
    } else if (currentTranslate < minTranslate) {
      currentTranslate = minTranslate;
    }

    // Áp dụng transform
    servicesGrid.style.transform = `translateX(${currentTranslate}px)`;
  }

  function dragEnd() {
    if (!isDragging) return;

    isDragging = false;
    servicesGrid.style.cursor = "grab";
    servicesGrid.style.transition = "transform 0.3s ease"; // Bật lại transition

    // Snap vào card gần nhất
    const snapThreshold = cardWidth / 4; // Ngưỡng snap
    const draggedDistance = currentTranslate - previousTranslate;

    if (Math.abs(draggedDistance) > snapThreshold) {
      if (draggedDistance > 0) {
        // Kéo sang phải
        currentIndex = Math.max(0, currentIndex - 1);
      } else {
        // Kéo sang trái
        currentIndex = Math.min(
          serviceCards.length - getVisibleCardCount(),
          currentIndex + 1
        );
      }
    }

    // Cập nhật vị trí
    moveToIndex(currentIndex);
    previousTranslate = -cardWidth * currentIndex;
  }

  function moveToIndex(index) {
    currentIndex = index;
    const translateX = -cardWidth * currentIndex;
    servicesGrid.style.transition = "transform 0.3s ease";
    servicesGrid.style.transform = `translateX(${translateX}px)`;
    updateActiveCards();
  }

  function updateActiveCards() {
    const visibleCount = getVisibleCardCount();

    serviceCards.forEach((card, index) => {
      if (index >= currentIndex && index < currentIndex + visibleCount) {
        card.classList.add("active-card");
        card.style.opacity = "1";
      } else {
        card.classList.remove("active-card");
        card.style.opacity = "0.5";
      }
    });

    // Cập nhật trạng thái nút
    prevButton.classList.toggle("disabled", currentIndex <= 0);
    nextButton.classList.toggle(
      "disabled",
      currentIndex >= serviceCards.length - visibleCount
    );
  }

  // Event listeners cho kéo thả
  servicesGrid.addEventListener("mousedown", dragStart);
  servicesGrid.addEventListener("touchstart", dragStart);

  window.addEventListener("mousemove", dragMove);
  window.addEventListener("touchmove", dragMove);

  window.addEventListener("mouseup", dragEnd);
  window.addEventListener("touchend", dragEnd);
  window.addEventListener("mouseleave", dragEnd);

  // Event listeners cho các nút điều hướng
  prevButton.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    moveToIndex(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex >= serviceCards.length - getVisibleCardCount()) return;
    currentIndex++;
    moveToIndex(currentIndex);
  });

  // Khởi tạo trạng thái active card
  updateActiveCards();
});

// Thêm vào file main.js hoặc thay thế phần counter hiện tại
document.addEventListener("DOMContentLoaded", function () {
  // Counter animation với hiệu ứng đếm liên tục
  const statNumbers = document.querySelectorAll(".stat-number");

  // Lưu trữ giá trị ban đầu của mỗi số
  const originalValues = [];
  statNumbers.forEach((number) => {
    // Lấy giá trị ban đầu từ nội dung HTML
    originalValues.push(parseInt(number.textContent));
  });

  // Hàm để tạo hiệu ứng đếm liên tục
  function startContinuousCounting() {
    statNumbers.forEach((number, index) => {
      const originalValue = originalValues[index];
      const incrementAmount = 50; // Cộng lên 50 đơn vị rồi reset

      // Bắt đầu từ giá trị ban đầu
      let currentValue = originalValue;

      // Bắt đầu đếm liên tục
      const interval = setInterval(() => {
        currentValue += 1; // Cộng lên từng đơn vị một

        // Nếu đã cộng lên đủ 50 đơn vị, reset về giá trị ban đầu
        if (currentValue >= originalValue + incrementAmount) {
          currentValue = originalValue;
        }

        // Cập nhật hiển thị
        number.textContent = currentValue;
      }, 100); // Tăng mỗi 100ms (điều chỉnh để nhanh/chậm hơn)

      // Lưu interval ID để có thể xóa nếu cần
      number.dataset.intervalId = interval;
    });
  }

  // Hàm kiểm tra khi phần tử trong viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Kích hoạt animation khi cuộn đến phần counter
  const counterStats = document.querySelector(".counter-stats");
  let animationStarted = false;

  function checkCounterVisibility() {
    if (
      !animationStarted &&
      counterStats &&
      isElementInViewport(counterStats)
    ) {
      startContinuousCounting();
      animationStarted = true;
      // Xóa event listener sau khi đã kích hoạt
      window.removeEventListener("scroll", checkCounterVisibility);
    }
  }

  // Kiểm tra khi cuộn trang
  window.addEventListener("scroll", checkCounterVisibility);

  // Kiểm tra ngay khi trang tải xong
  checkCounterVisibility();

  // Xóa interval khi người dùng rời trang để tránh memory leak
  window.addEventListener("beforeunload", function () {
    statNumbers.forEach((number) => {
      if (number.dataset.intervalId) {
        clearInterval(parseInt(number.dataset.intervalId));
      }
    });
  });
});

// Thêm vào file main.js
document.addEventListener("DOMContentLoaded", function () {
  createFallingObjects();
});

// Hàm tạo nhiều đối tượng rơi hơn phân bố khắp section
function createFallingObjects() {
  const container = document.querySelector(".falling-objects-container");
  if (!container) return;

  // Xóa tất cả lá hiện tại để tạo mới
  container.innerHTML = "";

  // Số lượng đối tượng rơi
  const objectCount = 30;

  // Tính toán chiều rộng của container
  const containerWidth = container.offsetWidth;

  // Tạo các đối tượng rơi mới
  for (let i = 0; i < objectCount; i++) {
    // Quyết định loại đối tượng (lá hoặc hình tròn)
    const isLeaf = Math.random() > 0.3; // 70% là lá

    // Tạo element mới
    const object = document.createElement("div");
    object.className = isLeaf ? "falling-object leaf" : "falling-object";

    // Thiết lập vị trí và kích thước ngẫu nhiên
    const size = isLeaf ? Math.random() * 20 + 15 : Math.random() * 15 + 5;
    const xPos = Math.random() * containerWidth;

    // Thiết lập style
    object.style.width = `${size}px`;
    object.style.height = `${size}px`;
    object.style.left = `${xPos}px`;

    // Đặt vị trí ban đầu ngẫu nhiên ngoài màn hình phía trên
    // Đảm bảo không có lá nào bị kẹt ở trên cùng
    const startPos = -Math.random() * 200 - 50; // Từ -50px đến -250px (ngoài màn hình)
    object.style.top = `${startPos}px`;

    // Thiết lập thời gian animation ngẫu nhiên (15-25 giây) - để rơi chậm hơn
    const duration = Math.random() * 10 + 15;
    object.style.animationDuration = `${duration}s`;

    // Tạo độ trễ ngẫu nhiên để các đối tượng không xuất hiện cùng lúc
    const delay = Math.random() * 15;
    object.style.animationDelay = `${delay}s`;

    // LOẠI BỎ hướng xoay ngược
    // Không sử dụng animationDirection = "reverse" nữa

    // Thêm vào container
    container.appendChild(object);
  }
}
