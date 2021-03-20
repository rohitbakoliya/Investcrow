import styled from 'styled-components';

export const SidebarWrapper = styled.aside<{ isOpen: boolean }>`
  padding: 60px 40px;
  border-right: ${p => p.theme.border};
  background-color: ${p => p.theme.colors.white};
  p {
    margin: 0;
  }
  .address--bar {
    svg {
      margin-left: 12px;
      cursor: pointer;
    }
  }
  .sidebar--sticky {
    position: sticky;
    top: 0;
  }
  .dashboard__avatar {
    margin-bottom: 5px;
    /* margin-top: ${p => p.theme.spacings.top}px; */
  }
  .nav--link:hover {
    color: ${p => p.theme.colors.primary};
    .start--icon {
      background-color: ${p => p.theme.colors.primary};
      color: ${p => p.theme.colors.accent};
    }
  }

  @media all and (${p => p.theme.media.tablet}) {
    position: fixed;
    top: 0;
    left: ${p => (p.isOpen ? '0px' : '-500px')};
    z-index: 1;
    padding: 80px 25px;
    width: 200px;
    min-height: 100vh;
    background-color: ${p => p.theme.colors.white};
    transition: 0.3s;
    a {
      font-size: 14px;
    }
    /* .dashboard__avatar {
      margin-top: ${p => p.theme.spacings.top}px;
    } */
  }
`;

export const SidebarLinks = styled.div`
  margin-top: ${p => p.theme.spacings.top}px;
  a {
    margin: 15px 0;
  }
`;
