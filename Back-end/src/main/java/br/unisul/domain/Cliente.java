package br.unisul.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity
public class Cliente implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String nome;
	private String email;
	private String telefone;
	private String cep;
	private String cpf;
	private String longitude;
	private String latitude;
	
	@JsonIgnore
	@OneToMany (mappedBy="cliente")
	private List<Solicitacao> solicitacoes = new ArrayList<>();
	
	@JsonIgnore
	@OneToOne (mappedBy="cliente")
	private Analise analise;
	
	public Cliente(Integer id, String nome, String email, String telefone, String cep, String cpf,
	String longitude, String latitude) {
		this.cep = cep;
		this.id = id;
		this.nome = nome;
		this.email = email;
		this.telefone = telefone;
		this.cpf = cpf;
		this.longitude = longitude;
		this.latitude = latitude;
	}
	
	public Cliente(Cliente c) {
		this.nome = c.getNome();
		this.email = c.getEmail();
		this.telefone = c.getTelefone();
		this.cep = c.getCep();
		this.cpf = c.getCpf();
		this.longitude = c.getLongitude();
		this.latitude = c.getLatitude();
	}
	
}