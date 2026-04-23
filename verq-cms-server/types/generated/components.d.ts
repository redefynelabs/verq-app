import type { Schema, Struct } from '@strapi/strapi';

export interface AboutAboutHero extends Struct.ComponentSchema {
  collectionName: 'components_about_about_heroes';
  info: {
    displayName: 'AboutHero';
  };
  attributes: {
    Desc: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface AboutFounderGrid extends Struct.ComponentSchema {
  collectionName: 'components_about_founder_grids';
  info: {
    displayName: 'FounderGrid';
  };
  attributes: {
    Grids: Schema.Attribute.Component<'shared.title-desc-group', true>;
  };
}

export interface AboutHowWeWork extends Struct.ComponentSchema {
  collectionName: 'components_about_how_we_works';
  info: {
    displayName: 'HowWeWork';
  };
  attributes: {
    Points: Schema.Attribute.Component<'shared.title-desc-group', true>;
    Title: Schema.Attribute.String;
  };
}

export interface AboutShowreel extends Struct.ComponentSchema {
  collectionName: 'components_about_showreels';
  info: {
    displayName: 'Showreel';
  };
  attributes: {
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface GlobalIconLink extends Struct.ComponentSchema {
  collectionName: 'components_global_icon_links';
  info: {
    displayName: 'IconLink';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.String;
  };
}

export interface GlobalLabeledLink extends Struct.ComponentSchema {
  collectionName: 'components_global_labeled_links';
  info: {
    displayName: 'Labeled Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

export interface HomeCta extends Struct.ComponentSchema {
  collectionName: 'components_home_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    Desc: Schema.Attribute.Text;
    Points: Schema.Attribute.Component<'shared.title-desc-group', true>;
    Title: Schema.Attribute.String;
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface HomeFaQs extends Struct.ComponentSchema {
  collectionName: 'components_home_fa_qs';
  info: {
    displayName: 'FAQs';
  };
  attributes: {
    FAQs: Schema.Attribute.Component<'shared.faq', true>;
    Title: Schema.Attribute.String;
  };
}

export interface HomeFloatingPoints extends Struct.ComponentSchema {
  collectionName: 'components_home_floating_points';
  info: {
    displayName: 'FloatingPoints';
  };
  attributes: {
    Points: Schema.Attribute.Component<'shared.points', true>;
    Title: Schema.Attribute.String;
  };
}

export interface HomeHomeAbout extends Struct.ComponentSchema {
  collectionName: 'components_home_home_abouts';
  info: {
    displayName: 'HomeAbout';
  };
  attributes: {
    Desc: Schema.Attribute.Text;
    GroupImageIcon: Schema.Attribute.Component<
      'shared.image-icon-info-group',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface HomeHomeStudio extends Struct.ComponentSchema {
  collectionName: 'components_home_home_studios';
  info: {
    displayName: 'HomeStudio';
  };
  attributes: {
    Desc: Schema.Attribute.Text;
    Points: Schema.Attribute.Component<'shared.title-desc-group', true>;
    Title: Schema.Attribute.String;
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface HomeServiceList extends Struct.ComponentSchema {
  collectionName: 'components_home_service_lists';
  info: {
    displayName: 'ServiceList';
  };
  attributes: {
    List: Schema.Attribute.Component<'shared.title-desc-group', true>;
  };
}

export interface HomeTeam extends Struct.ComponentSchema {
  collectionName: 'components_home_teams';
  info: {
    displayName: 'Team';
  };
  attributes: {
    TeamCards: Schema.Attribute.Component<'team.team-card', true>;
    Title: Schema.Attribute.String;
  };
}

export interface PortfolioPortfolioCard extends Struct.ComponentSchema {
  collectionName: 'components_portfolio_portfolio_cards';
  info: {
    displayName: 'PortfolioCard';
  };
  attributes: {
    desc: Schema.Attribute.String;
    title: Schema.Attribute.String;
    type: Schema.Attribute.String;
    WorkImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SharedClients extends Struct.ComponentSchema {
  collectionName: 'components_shared_clients';
  info: {
    displayName: 'Clients';
  };
  attributes: {
    Logos: Schema.Attribute.Component<'shared.media', true>;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    Answer: Schema.Attribute.Text;
    Question: Schema.Attribute.Text;
  };
}

export interface SharedImageIconInfoGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_icon_info_groups';
  info: {
    displayName: 'ImageIconInfoGroup';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedPoints extends Struct.ComponentSchema {
  collectionName: 'components_shared_points';
  info: {
    displayName: 'Points';
  };
  attributes: {
    desc: Schema.Attribute.Text;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SharedTitleDescGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_title_desc_groups';
  info: {
    displayName: 'TitleDescGroup';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface TeamTeamCard extends Struct.ComponentSchema {
  collectionName: 'components_team_team_cards';
  info: {
    displayName: 'TeamCard';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Schema.Attribute.String;
    Role: Schema.Attribute.String;
  };
}

export interface WorkWorks extends Struct.ComponentSchema {
  collectionName: 'components_work_works';
  info: {
    displayName: 'Works';
  };
  attributes: {
    BannerImg: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Contents: Schema.Attribute.Component<'shared.rich-text', true>;
    Desc: Schema.Attribute.Text;
    Images: Schema.Attribute.Component<'shared.media', true>;
    ProjectLink: Schema.Attribute.String;
    Services: Schema.Attribute.Component<'shared.points', true>;
    SmallDesc: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about.about-hero': AboutAboutHero;
      'about.founder-grid': AboutFounderGrid;
      'about.how-we-work': AboutHowWeWork;
      'about.showreel': AboutShowreel;
      'global.icon-link': GlobalIconLink;
      'global.labeled-link': GlobalLabeledLink;
      'home.cta': HomeCta;
      'home.fa-qs': HomeFaQs;
      'home.floating-points': HomeFloatingPoints;
      'home.home-about': HomeHomeAbout;
      'home.home-studio': HomeHomeStudio;
      'home.service-list': HomeServiceList;
      'home.team': HomeTeam;
      'portfolio.portfolio-card': PortfolioPortfolioCard;
      'shared.clients': SharedClients;
      'shared.faq': SharedFaq;
      'shared.image-icon-info-group': SharedImageIconInfoGroup;
      'shared.media': SharedMedia;
      'shared.points': SharedPoints;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.title-desc-group': SharedTitleDescGroup;
      'team.team-card': TeamTeamCard;
      'work.works': WorkWorks;
    }
  }
}
