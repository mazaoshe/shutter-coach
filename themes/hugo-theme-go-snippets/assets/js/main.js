// Page navigation
function showPage (page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));

  // Show selected page
  const pageElement = document.getElementById(`${page}-page`);
  if (pageElement) {
    pageElement.classList.remove('hidden');
  }
}

// Mobile menu toggle
function toggleMobileMenu () {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  mobileMenu.classList.toggle('active');
  menuIcon.classList.toggle('hidden');
  closeIcon.classList.toggle('hidden');
}


// Close snippet modal
function closeSnippetModal () {
  const modal = document.getElementById('snippet-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Copy code to clipboard
async function copyCode (snippetId) {
  const codeElement = document.getElementById(`code-${snippetId}`);
  if (!codeElement) return;

  try {
    await navigator.clipboard.writeText(codeElement.textContent);

    // Show success feedback
    const button = codeElement.parentElement.querySelector('.copy-button');
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i data-lucide="check" class="h-4 w-4"></i>';
    lucide.createIcons();

    setTimeout(() => {
      button.innerHTML = originalHTML;
      lucide.createIcons();
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
    alert('Failed to copy code to clipboard');
  }
}

// Search functionality (basic implementation)
function handleSearch () {
  const query = document.getElementById('searchInput').value.toLowerCase();
  // This is a placeholder - you can implement search logic here
  console.log('Searching for:', query);
}

// Close modal when clicking outside
document.addEventListener('click', function (event) {
  const modal = document.getElementById('snippet-modal');
  if (event.target === modal) {
    closeSnippetModal();
  }
});

// Handle escape key
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeSnippetModal();
  }
});

// Initialize Lucide icons when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  lucide.createIcons();
});